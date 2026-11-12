import { importX509, jwtVerify } from "jose";

const FIREBASE_CERTIFICATES_URL =
	"https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

let certificateCache;
let certificateCacheExpiresAt = 0;
let certificateRequest;

export class FirebaseCertificateError extends Error {
	constructor(message = "Firebase signing certificates are unavailable") {
		super(message);
		this.name = "FirebaseCertificateError";
	}
}

async function loadCertificates(fetcher, forceRefresh = false) {
	if (!forceRefresh && certificateCache && Date.now() < certificateCacheExpiresAt) {
		return certificateCache;
	}
	if (certificateRequest && !forceRefresh) return certificateRequest;

	certificateRequest = (async () => {
		let response;
		try {
			response = await fetcher(FIREBASE_CERTIFICATES_URL);
		} catch {
			throw new FirebaseCertificateError();
		}
		if (!response.ok) throw new FirebaseCertificateError();

		let certificates;
		try {
			certificates = await response.json();
		} catch {
			throw new FirebaseCertificateError();
		}
		if (!certificates || typeof certificates !== "object") {
			throw new FirebaseCertificateError();
		}

		const maxAge = response.headers
			.get("Cache-Control")
			?.match(/max-age=(\d+)/i)?.[1];
		certificateCache = certificates;
		certificateCacheExpiresAt = Date.now() + Number(maxAge ?? 3600) * 1000;
		return certificateCache;
	})();

	try {
		return await certificateRequest;
	} finally {
		certificateRequest = undefined;
	}
}

export async function verifyFirebaseIdToken(token, projectId, fetcher = fetch) {
	const issuer = `https://securetoken.google.com/${projectId}`;
	const { payload } = await jwtVerify(
		token,
		async (protectedHeader) => {
			if (protectedHeader.alg !== "RS256" || typeof protectedHeader.kid !== "string") {
				throw new Error("Unsupported Firebase token signing key");
			}

			let certificates = await loadCertificates(fetcher);
			if (!certificates[protectedHeader.kid]) {
				certificates = await loadCertificates(fetcher, true);
			}
			const certificate = certificates[protectedHeader.kid];
			if (!certificate) throw new Error("Unknown Firebase token signing key");
			return importX509(certificate, "RS256");
		},
		{
			issuer,
			audience: projectId,
			algorithms: ["RS256"],
			requiredClaims: ["exp", "iat", "auth_time", "sub"],
			maxTokenAge: "1h",
			clockTolerance: 30,
		},
	);

	if (typeof payload.sub !== "string" || payload.sub.length === 0) {
		throw new Error("Firebase token has no user ID");
	}

	return {
		uid: payload.sub,
		email: typeof payload.email === "string" ? payload.email : undefined,
	};
}
