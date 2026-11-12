import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalSearchBar.jsx
 */
import { Form, Row, Col, Button, InputGroup } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


export default function JournalSearchBar({
  searchInput,
  setSearchInput,
  quartile,
  setQuartile,
  isOpenAccess,
  setIsOpenAccess,
  onSubmit,
  onClear
}) {
  const {
    t
  } = useTranslation();
  return <Form onSubmit={onSubmit} className="journal-search-panel">
      <Row sx={{ gap: "1rem", alignItems: "center" }} >
        {/* Search Input Box */}
        <Col lg={6} md={12}>
          <InputGroup className="journal-search-group">
            <InputGroup.Text className="journal-search-addon">
              <Icon icon="lucide:search" width="18" />
            </InputGroup.Text>
            <Form.Control type="text" placeholder={t("journal.timJournal")} value={searchInput} onChange={e => setSearchInput(e.target.value)} className="journal-search-input" />
            {searchInput && <Button sx={{ padding: "0.5rem" }} variant="link" className="journal-search-clear" onClick={() => setSearchInput('')}>
                <Icon icon="lucide:x" width="16" />
              </Button>}
            <Button sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", border: 0 }} type="submit" className="journal-search-submit">{t("search")}</Button>
          </InputGroup>
        </Col>

        {/* Quartile Dropdown */}
        <Col lg={2.5} md={4} sm={6} xs={12}>
          <Form.Select value={quartile} onChange={e => setQuartile(e.target.value)} className="journal-filter-select text-main py-2.5">
            <option value="all">{t("journal.tatCaQuartile")}</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </Form.Select>
        </Col>

        {/* Access Dropdown */}
        <Col lg={2.5} md={4} sm={6} xs={12}>
          <Form.Select value={isOpenAccess} onChange={e => setIsOpenAccess(e.target.value)} className="journal-filter-select text-main py-2.5">
            <option value="all">{t("journal.tatCaTruyCap")}</option>
            <option value="oa">Open Access (OA)</option>
            <option value="subscription">Subscription</option>
          </Form.Select>
        </Col>

        {/* Clear Button */}
        <Col sx={{ "@media (min-width:768px)": { textAlign: "right" }, textAlign: "center" }} lg={1} md={4} sm={12} xs={12} >
          <Button sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="link" className="journal-reset-btn" onClick={onClear}>
            <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:refresh-cw"  />
            Reset
          </Button>
        </Col>
      </Row>
    </Form>;
}
