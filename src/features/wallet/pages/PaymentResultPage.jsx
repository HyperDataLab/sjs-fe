import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MotionBox } from '../../../shared/components/ui/MotionBox';
import Icon from '../../../shared/components/Icon.jsx';
import Header from '../../landing/components/Header';
import ROUTES from '../../../app/routes/routePaths';
import { useWalletStore } from '../../../app/store/walletStore';
import { getPaymentByOrderCode, getMyWallet, getPaymentStatus } from '../api/walletApi';
export default function PaymentResultPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setBalance,
    fetchWallet
  } = useWalletStore();
  const [stage, setStage] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [payment, setPayment] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const orderCode = searchParams.get('orderCode') || '';
  const transactionId = searchParams.get('transactionId') || searchParams.get('vnp_TxnRef') || searchParams.get('txnRef') || '';
  const payosStatus = searchParams.get('status') || '';
  const isCancelled = searchParams.get('cancel') === 'true' || payosStatus === 'CANCELLED';
  const isSuccessParam = (searchParams.get('code') === '00' && !isCancelled) || payosStatus === 'PAID';

  useEffect(() => {
    let mounted = true;
    const runFlow = async () => {
      setLoading(true);
      setErrorMessage('');
      setStage('pending');

      if (isCancelled) {
        if (mounted) {
          setStage('failed');
          setErrorMessage(t("wallet.giaoDichBiHuy") || 'Giao dịch đã bị hủy hoặc chưa hoàn tất.');
          setLoading(false);
        }
        return;
      }

      try {
        let paymentData = null;

        // Ưu tiên tra cứu theo orderCode của PayOS
        if (orderCode) {
          try {
            const res = await getPaymentByOrderCode(orderCode);
            paymentData = res?.data || null;
            if (mounted && paymentData) setPayment(paymentData);
          } catch {
            // fallback nếu BE chưa sync
          }
        }

        // Fallback tra cứu theo transactionId
        if (!paymentData && transactionId) {
          try {
            const paymentRes = await getPaymentStatus(transactionId);
            paymentData = paymentRes?.data || null;
            if (mounted && paymentData) setPayment(paymentData);
          } catch {
            // keep whatever we have
          }
        }

        if (!mounted) return;

        const paymentStatus = paymentData?.payment_status;
        const shouldShowSuccess = paymentStatus === 'success' || isSuccessParam;
        const shouldShowFailed = isCancelled || paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'refunded';

        // Refresh số dư ví khi thanh toán thành công
        if (shouldShowSuccess) {
          try {
            const walletRes = await getMyWallet();
            const balance = walletRes?.data?.balance;
            if (typeof balance === 'number') {
              setWalletBalance(balance);
              setBalance(balance);
            }
            fetchWallet();
          } catch {
            // ignore wallet refresh failure in result UI
          }
        }

        if (shouldShowSuccess) {
          setStage('success');
        } else if (shouldShowFailed) {
          setStage('failed');
          setErrorMessage(paymentData?.note || t("wallet.giaoDichChuaDuocXacNhanThanhCo"));
        } else {
          setStage('pending');
          setErrorMessage(paymentData?.note || t("wallet.heThongDangChoXacNhanGiaoDichT"));
        }
      } catch (err) {
        if (!mounted) return;
        setStage('failed');
        setErrorMessage(err?.response?.data?.message || err?.message || t("wallet.khongTheXacMinhGiaoDich"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    runFlow();
    return () => {
      mounted = false;
    };
  }, [location.search, orderCode, transactionId, isCancelled, isSuccessParam, fetchWallet, setBalance, t]);
  const formatCoin = n => Number.isInteger(n) ? Number(n || 0).toLocaleString('en-US') : Number(n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const formatVND = n => Number(n || 0).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  const statusUI = {
    success: {
      iconClass: 'success',
      icon: 'lucide:badge-check',
      title: t("wallet.thanhToanThanhCong"),
      subtitle: t("wallet.giaoDichCuaBanDaDuocXacNhanCoi")
    },
    failed: {
      iconClass: 'failed',
      icon: 'lucide:circle-x',
      title: t("wallet.thanhToanThatBai"),
      subtitle: t("wallet.giaoDichChuaHoanTatBanCoTheThu")
    },
    pending: {
      iconClass: 'pending',
      icon: 'lucide:clock-3',
      title: t("wallet.dangXacNhanGiaoDich"),
      subtitle: t("wallet.heThongDangXuLyKetQuaThanhToan")
    }
  };
  const currentStatus = statusUI[stage];
  const details = [
    [t('wallet.maGiaoDich'), payment?.order_code || orderCode || payment?.transaction_id || transactionId || '?'],
    [t('journal.phuongThuc'), payment?.payment_method === 'momo' ? 'MoMo' : 'PayOS (VietQR)'],
    [t('wallet.goiCoin'), payment?.package_name || t('wallet.goiCoinDaChon')],
    [t('wallet.soTien'), payment?.amount ? formatVND(payment.amount) : '?'],
    [t('wallet.tongCoinNhan'), payment?.total_coin ? formatCoin(payment.total_coin) + ' Coins' : '?'],
    [t('wallet.thoiGian'), payment?.paid_at || payment?.created_at || '?'],
  ];
  const statusColor = stage === 'success' ? 'success.main' : stage === 'failed' ? 'error.main' : 'primary.main';
  const actions = stage === 'success'
    ? [
        { label: t('wallet.napThemCoin'), icon: 'lucide:wallet', onClick: () => navigate(ROUTES.WALLET_TOP_UP), primary: true },
        { label: t('wallet.quayVeDashboard'), icon: 'lucide:layout-dashboard', onClick: () => navigate(ROUTES.DASHBOARD) },
      ]
    : stage === 'failed'
      ? [
          { label: t('article.thuLai'), icon: 'lucide:rotate-ccw', onClick: () => navigate(ROUTES.WALLET_TOP_UP), primary: true },
          { label: t('auth.quayLai'), icon: 'lucide:arrow-left', onClick: () => navigate(-1) },
        ]
      : [
          { label: t('wallet.kiemTraLaiTrangThai'), icon: 'lucide:refresh-cw', onClick: () => window.location.reload(), primary: true },
          { label: t('wallet.veTrangNapCoin'), icon: 'lucide:wallet', onClick: () => navigate(ROUTES.WALLET_TOP_UP) },
        ];

  return (
    <Box component="main" sx={{ minHeight: '100vh', pt: '80px', color: 'text.primary', background: 'radial-gradient(circle at top, rgba(255, 122, 51, 0.055), transparent 34%), #f8fafc' }}>
      <Header />
      <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} sx={{ maxWidth: 980, mx: 'auto', px: 2, py: { xs: 4, sm: 5, md: 7 } }}>
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ maxWidth: 620, mx: 'auto' }}>
          <Box sx={{ width: 84, height: 84, borderRadius: '50%', display: 'grid', placeItems: 'center', color: statusColor, bgcolor: stage === 'success' ? 'success.light' : stage === 'failed' ? 'error.light' : 'primary.light' }}>
            {loading ? <CircularProgress size={30} color="inherit" /> : <Icon icon={currentStatus.icon} width={38} />}
          </Box>
          <Typography component="h1" variant="h4" fontWeight={900} letterSpacing="-0.04em">
            {loading ? t('wallet.dangKiemTraGiaoDich') : currentStatus.title}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.65 }}>
            {loading ? t('wallet.heThongDangDongBoTrangThaiThan') : currentStatus.subtitle}
          </Typography>

          <Paper elevation={0} sx={{ width: '100%', p: { xs: 2.5, sm: 3 }, mt: 1, border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'left', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={2} sx={{ pb: 2, mb: 1.5, borderBottom: '1px dashed', borderColor: 'divider' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>{t('wallet.soDuViHienTai')}</Typography>
                <Typography variant="h5" color="primary.main" fontWeight={900}>{walletBalance == null ? '?' : formatCoin(walletBalance)} Coins</Typography>
              </Box>
              {payment?.payment_status && <Box sx={{ minWidth: 150 }}><Typography variant="caption" color="text.secondary" fontWeight={800} display="block">{t('wallet.trangThai')}</Typography><Typography fontWeight={800}>{payment.payment_status}</Typography></Box>}
            </Stack>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
              {details.map(([label, value]) => (
                <Box key={label} sx={{ p: 1.5, borderRadius: 1.75, bgcolor: 'action.hover', minWidth: 0 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={800} display="block" sx={{ mb: 0.5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</Typography>
                  <Typography variant="body2" fontWeight={800} sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {!loading && errorMessage && (
            <Alert severity={stage === 'failed' ? 'error' : 'warning'} icon={<Icon icon={stage === 'failed' ? 'lucide:triangle-alert' : 'lucide:info'} width={18} />} sx={{ width: '100%', mt: 0.5, textAlign: 'left', borderRadius: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" flexWrap="wrap" spacing={1.5} sx={{ pt: 1, width: '100%' }}>
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.primary ? 'contained' : 'outlined'}
                startIcon={<Icon icon={action.icon} width={16} />}
                onClick={action.onClick}
                sx={{ minHeight: 44, px: 2.5, borderRadius: 99, fontWeight: 800, ...(action.primary ? { boxShadow: '0 8px 18px rgba(255, 122, 51, 0.18)' } : {}) }}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            <Icon icon="lucide:shield-check" width={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            {t('wallet.ketQuaDuocDongBoTuVnpayVaHeTho')}
          </Typography>
        </Stack>
      </MotionBox>
    </Box>
  );

}
