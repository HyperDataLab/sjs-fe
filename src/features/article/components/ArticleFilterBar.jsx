import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleFilterBar.jsx
 */
import { useState, useEffect } from 'react';
import { Dropdown, Form } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { FilterSearch } from '../../../shared/components/Input';
import { FilterCard } from '../../../shared/components/Card';
import { getArticleFilterOptionsApi } from '../api/articleApi';
import { searchJournalsApi, getJournalByIdApi } from '../../journal/api/journalApi';
import { getTopicsApi, getTopicByIdApi } from '../../topic/api/topic.api';


import MuiBox from '@mui/material/Box';


export default function ArticleFilterBar({
  filters,
  updateFilters,
  clearFilters
}) {
  const { t } = useTranslation();

  const SORT_OPTIONS = [
    { value: 'created_at-desc', label: t("article.moiNhat", "Mới nhất") },
    { value: 'created_at-asc', label: t("article.cuNhat", "Cũ nhất") },
    { value: 'title-asc', label: t("article.tieuDeAz", "Tiêu đề A-Z") },
    { value: 'title-desc', label: t("article.tieuDeZa", "Tiêu đề Z-A") },
    { value: 'publication_year-desc', label: t("article.namXuatBanGiam", "Năm xuất bản (Giảm)") },
    { value: 'publication_year-asc', label: t("article.namXuatBanTang", "Năm xuất bản (Tăng)") }
  ];

  const ACCESS_OPTIONS = [
    { value: 'all', label: t("article.tatCa", "Tất cả bài báo") },
    { value: 'oa', label: t("article.chiHienThiOpenAccess", "Chỉ hiển thị Open Access") },
    { value: 'closed', label: t("article.chiHienThiKhongOpenAccess", "Không Open Access (Closed)") }
  ];

  // Options states
  const [yearOptions, setYearOptions] = useState([]);
  const [baseJournalOptions, setBaseJournalOptions] = useState([]);
  const [journalOptions, setJournalOptions] = useState([]);
  const [baseTopicOptions, setBaseTopicOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);

  // Loading & search states
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [searchingJournals, setSearchingJournals] = useState(false);
  const [searchingTopics, setSearchingTopics] = useState(false);
  const [menuSearch, setMenuSearch] = useState({ year: '', journal: '', topic: '' });

  // Selected item custom labels (khi id từ URL không nằm trong top options ban đầu)
  const [selectedJournalName, setSelectedJournalName] = useState('');
  const [selectedTopicName, setSelectedTopicName] = useState('');

  // 1. Fetch metadata bộ lọc ban đầu (năm thực tế, top journals, top topics)
  useEffect(() => {
    let isMounted = true;

    const fetchInitialFilterMetadata = async () => {
      setLoadingFilters(true);
      try {
        const response = await getArticleFilterOptionsApi();
        if (isMounted && response?.data?.success && response?.data?.data) {
          const { years = [], journals = [], topics = [] } = response.data.data;

          // Years
          const formattedYears = years.map((y) => ({
            value: String(y),
            label: String(y)
          }));
          setYearOptions(formattedYears);

          // Top Journals
          const formattedJournals = journals.map((j) => ({
            value: String(j.journal_id),
            label: j.display_name,
            count: j.article_count
          }));
          setBaseJournalOptions(formattedJournals);
          setJournalOptions(formattedJournals);

          // Top Topics
          const formattedTopics = topics.map((tp) => ({
            value: String(tp.topic_id),
            label: tp.display_name,
            count: tp.article_count
          }));
          setBaseTopicOptions(formattedTopics);
          setTopicOptions(formattedTopics);
        }
      } catch (error) {
        console.error('Failed to fetch article filter options from server:', error);
      } finally {
        if (isMounted) setLoadingFilters(false);
      }
    };

    fetchInitialFilterMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Resolve selected journal name nếu chưa có trong options
  useEffect(() => {
    const journalId = filters.selectedJournal;
    if (!journalId || journalId === 'all') {
      setSelectedJournalName('');
      return;
    }

    const found = journalOptions.find((o) => String(o.value) === String(journalId))
      || baseJournalOptions.find((o) => String(o.value) === String(journalId));

    if (found) {
      setSelectedJournalName(found.label);
    } else {
      let isCurrent = true;
      getJournalByIdApi(journalId)
        .then((res) => {
          if (!isCurrent) return;
          const journalData = res?.data?.data || res?.data;
          const name = journalData?.display_name || `Journal #${journalId}`;
          setSelectedJournalName(name);
          setJournalOptions((prev) => {
            if (prev.some((o) => String(o.value) === String(journalId))) return prev;
            return [{ value: String(journalId), label: name }, ...prev];
          });
        })
        .catch(() => {
          if (isCurrent) setSelectedJournalName(`Journal #${journalId}`);
        });

      return () => {
        isCurrent = false;
      };
    }
  }, [filters.selectedJournal, journalOptions, baseJournalOptions]);

  // 3. Resolve selected topic name nếu chưa có trong options
  useEffect(() => {
    const topicId = filters.selectedTopic;
    if (!topicId || topicId === 'all') {
      setSelectedTopicName('');
      return;
    }

    const found = topicOptions.find((o) => String(o.value) === String(topicId))
      || baseTopicOptions.find((o) => String(o.value) === String(topicId));

    if (found) {
      setSelectedTopicName(found.label);
    } else {
      let isCurrent = true;
      getTopicByIdApi(topicId)
        .then((res) => {
          if (!isCurrent) return;
          const topicData = res?.data?.data || res?.data;
          const name = topicData?.display_name || topicData?.name || `Topic #${topicId}`;
          setSelectedTopicName(name);
          setTopicOptions((prev) => {
            if (prev.some((o) => String(o.value) === String(topicId))) return prev;
            return [{ value: String(topicId), label: name }, ...prev];
          });
        })
        .catch(() => {
          if (isCurrent) setSelectedTopicName(`Topic #${topicId}`);
        });

      return () => {
        isCurrent = false;
      };
    }
  }, [filters.selectedTopic, topicOptions, baseTopicOptions]);

  // 4. Server-side debounced search cho Tạp chí qua useEffect
  useEffect(() => {
    const keyword = menuSearch.journal.trim();
    if (!keyword) {
      setJournalOptions(baseJournalOptions);
      setSearchingJournals(false);
      return;
    }

    setSearchingJournals(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchJournalsApi({ search: keyword, limit: 40 });
        const items = res?.data?.data?.items || res?.data?.items || [];
        const mapped = items.map((j) => ({
          value: String(j.journal_id),
          label: j.display_name
        }));
        setJournalOptions(mapped);
      } catch (err) {
        console.error('Error searching journals:', err);
      } finally {
        setSearchingJournals(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [menuSearch.journal, baseJournalOptions]);

  // 5. Server-side debounced search cho Topic qua useEffect
  useEffect(() => {
    const keyword = menuSearch.topic.trim();
    if (!keyword) {
      setTopicOptions(baseTopicOptions);
      setSearchingTopics(false);
      return;
    }

    setSearchingTopics(true);
    const timer = setTimeout(async () => {
      try {
        const res = await getTopicsApi({ search: keyword, limit: 40 });
        const topicData = res?.data?.data || res?.data;
        const items = topicData?.topics || topicData?.items || (Array.isArray(topicData) ? topicData : []);
        const mapped = items.map((tp) => ({
          value: String(tp.topic_id || tp.id),
          label: tp.display_name || tp.name || `Topic #${tp.topic_id || tp.id}`
        })).filter((item) => item.value && item.label);
        setTopicOptions(mapped);
      } catch (err) {
        console.error('Error searching topics:', err);
      } finally {
        setSearchingTopics(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [menuSearch.topic, baseTopicOptions]);

  const handleSearchChange = (val) => {
    updateFilters({ search: val });
  };

  const handleSelectChange = (key) => (val) => {
    updateFilters({ [key]: val });
  };

  const handleSortChange = (val) => {
    const [sortBy, sortOrder] = val.split('-');
    updateFilters({ sortBy, sortOrder });
  };

  const currentSortValue = `${filters.sortBy}-${filters.sortOrder}`;

  // Filter Configs
  const filterConfigs = [
    {
      id: 'year',
      label: t("article.nam", "Năm"),
      options: yearOptions,
      selectedLabel: filters.selectedYear !== 'all' ? filters.selectedYear : '',
      onSelect: handleSelectChange('year'),
      onClear: () => handleSelectChange('year')('all'),
      searchable: true,
      onSearchChange: (keyword) => setMenuSearch((prev) => ({ ...prev, year: keyword })),
      emptyLabel: t("article.khongCoLuaChonPhuHop", "Không có năm phù hợp")
    },
    {
      id: 'journal',
      label: t("typeJournal", "Tạp chí"),
      options: journalOptions,
      selectedLabel: filters.selectedJournal !== 'all' ? (selectedJournalName || filters.selectedJournal) : '',
      onSelect: handleSelectChange('journal'),
      onClear: () => handleSelectChange('journal')('all'),
      searchable: true,
      searching: searchingJournals,
      onSearchChange: (keyword) => setMenuSearch((prev) => ({ ...prev, journal: keyword })),
      emptyLabel: t("article.khongTimThayTapChi", "Không tìm thấy tạp chí")
    },
    {
      id: 'topic',
      label: t("article.chuDe", "Chủ đề"),
      options: topicOptions,
      selectedLabel: filters.selectedTopic !== 'all' ? (selectedTopicName || filters.selectedTopic) : '',
      onSelect: handleSelectChange('topic'),
      onClear: () => handleSelectChange('topic')('all'),
      searchable: true,
      searching: searchingTopics,
      onSearchChange: (keyword) => setMenuSearch((prev) => ({ ...prev, topic: keyword })),
      emptyLabel: t("article.khongTimThayChuDe", "Không tìm thấy chủ đề")
    }
  ];

  // Active chips
  const activeChips = [];

  if (filters.selectedYear && filters.selectedYear !== 'all') {
    activeChips.push({
      id: 'year',
      label: t("article.nam", "Năm"),
      value: `${t("article.nam", "Năm")}: ${filters.selectedYear}`,
      onClear: () => handleSelectChange('year')('all')
    });
  }

  if (filters.selectedJournal && filters.selectedJournal !== 'all') {
    activeChips.push({
      id: 'journal',
      label: t("typeJournal", "Tạp chí"),
      value: `${t("typeJournal", "Tạp chí")}: ${selectedJournalName || filters.selectedJournal}`,
      onClear: () => handleSelectChange('journal')('all')
    });
  }

  if (filters.selectedTopic && filters.selectedTopic !== 'all') {
    activeChips.push({
      id: 'topic',
      label: t("article.chuDe", "Chủ đề"),
      value: `${t("article.chuDe", "Chủ đề")}: ${selectedTopicName || filters.selectedTopic}`,
      onClear: () => handleSelectChange('topic')('all')
    });
  }

  if (filters.selectedAccess === 'oa') {
    activeChips.push({
      id: 'access',
      label: 'Access',
      value: 'Open Access',
      onClear: () => handleSelectChange('access')('all')
    });
  } else if (filters.selectedAccess === 'closed') {
    activeChips.push({
      id: 'access',
      label: 'Access',
      value: t("article.chiHienThiKhongOpenAccess", "Không Open Access"),
      onClear: () => handleSelectChange('access')('all')
    });
  }

  if (currentSortValue !== 'created_at-desc') {
    activeChips.push({
      id: 'sort',
      label: 'Sort',
      value: `${t("article.sapXep", "Sắp xếp")}: ${SORT_OPTIONS.find((o) => o.value === currentSortValue)?.label || currentSortValue}`,
      onClear: () => handleSortChange('created_at-desc')
    });
  }

  const getFilteredOptions = (config) => {
    if (config.id === 'year') {
      const keyword = (menuSearch.year || '').trim().toLowerCase();
      if (!keyword) return config.options;
      return config.options.filter((o) => o.label.toLowerCase().includes(keyword));
    }
    return config.options;
  };

  const renderDropdown = (config) => {
    const filteredOptions = getFilteredOptions(config);
    const activeValue = config.id === 'year'
      ? filters.selectedYear
      : config.id === 'journal'
        ? filters.selectedJournal
        : filters.selectedTopic;

    const buttonDisplayLabel = config.selectedLabel || config.label;

    return (
      <Dropdown key={config.id} className="article-filter-dropdown" autoClose="outside">
        <Dropdown.Toggle
          variant="light"
          id={`article-filter-${config.id}`}
          className={`article-filter-button ${config.selectedLabel ? 'is-active' : ''}`}
          disabled={loadingFilters}
          title={config.selectedLabel ? `${config.label}: ${config.selectedLabel}` : config.label}
        >
          <span className="article-filter-button-label">
            {buttonDisplayLabel}
          </span>
          <Icon icon="lucide:chevron-down" width="15" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="article-filter-menu">
          <div className="article-filter-menu-header">
            <span>{config.label}</span>
            {config.selectedLabel && (
              <button
                type="button"
                onClick={() => {
                  config.onClear();
                  setMenuSearch((prev) => ({ ...prev, [config.id]: '' }));
                }}
                className="article-filter-reset-btn"
              >
                Reset
              </button>
            )}
          </div>

          {config.searchable && (
            <div className="article-menu-search">
              {config.searching ? (
                <Icon sx={{ width: "1rem", height: "1rem", borderWidth: "0.2em" }} icon="lucide:loader-2" className="animate-spin" width="15" />
              ) : (
                <Icon icon="lucide:search" width="15" />
              )}
              <input
                type="search"
                value={menuSearch[config.id] || ''}
                onChange={(e) => {
                  if (config.onSearchChange) {
                    config.onSearchChange(e.target.value);
                  }
                }}
                placeholder={t("article.searchValues", "Tìm kiếm giá trị...")}
              />
            </div>
          )}

          <div className="article-filter-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = String(activeValue || '') === String(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    title={option.label}
                    className={`article-filter-option ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        config.onClear();
                        return;
                      }
                      config.onSelect(option.value);
                    }}
                  >
                    <span className="article-option-check" aria-hidden="true">
                      {isSelected && <Icon icon="lucide:check" width="13" />}
                    </span>
                    <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >{option.label}</MuiBox>
                  </button>
                );
              })
            ) : (
              <div className="article-filter-empty">
                {config.emptyLabel || t("article.khongCoLuaChonPhuHop", "Không có lựa chọn phù hợp")}
              </div>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const isMoreFiltersActive = filters.selectedAccess && filters.selectedAccess !== 'all';

  return (
    <FilterCard sx={{ textAlign: "left", marginBottom: "1.5rem" }} className="article-filter-card">
      <div className="article-filter-layout">
        <div className="article-filter-toolbar" aria-label="Article filters">
          {filterConfigs.map(renderDropdown)}

          {/* Sắp xếp */}
          <Dropdown className="article-filter-dropdown" autoClose="outside">
            <Dropdown.Toggle
              variant="light"
              id="article-sort-filters"
              className={`article-filter-button ${currentSortValue !== 'created_at-desc' ? 'is-active' : ''}`}
            >
              <span className="article-filter-button-label">
                {currentSortValue !== 'created_at-desc'
                  ? SORT_OPTIONS.find((o) => o.value === currentSortValue)?.label
                  : t("article.sapXep", "Sắp xếp")}
              </span>
              <Icon icon="lucide:arrow-up-down" width="15" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="article-filter-menu">
              <div className="article-filter-menu-header">
                <span>{t("article.sapXepBaiBao", "Sắp xếp bài báo")}</span>
                {currentSortValue !== 'created_at-desc' && (
                  <button
                    type="button"
                    onClick={() => handleSortChange('created_at-desc')}
                    className="article-filter-reset-btn"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="article-filter-options">
                {SORT_OPTIONS.map((option) => {
                  const isSelected = option.value === currentSortValue;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`article-filter-option ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSortChange(option.value)}
                    >
                      <span className="article-option-check" aria-hidden="true">
                        {isSelected && <Icon icon="lucide:check" width="13" />}
                      </span>
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>

          {/* More filters (Open Access hoặc không) */}
          <Dropdown className="article-filter-dropdown" autoClose="outside">
            <Dropdown.Toggle
              variant="light"
              id="article-more-filters"
              className={`article-filter-button article-more-filter-button ${isMoreFiltersActive ? 'is-active' : ''}`}
            >
              <Icon icon="lucide:sliders-horizontal" width="16" />
              <span>
                {isMoreFiltersActive
                  ? ACCESS_OPTIONS.find((o) => o.value === filters.selectedAccess)?.label || "More filters"
                  : "More filters"}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="article-filter-menu article-more-filter-menu" style={{ minWidth: '240px' }}>
              <div className="article-filter-menu-header">
                <span>{t("article.trangThaiTruyCap", "Trạng thái truy cập")}</span>
                {isMoreFiltersActive && (
                  <button
                    type="button"
                    onClick={() => handleSelectChange('access')('all')}
                    className="article-filter-reset-btn"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="article-filter-options">
                {ACCESS_OPTIONS.map((opt) => {
                  const isSelected = (filters.selectedAccess || 'all') === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`article-filter-option ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectChange('access')(opt.value)}
                    >
                      <span className="article-option-check" aria-hidden="true">
                        {isSelected && <Icon icon="lucide:check" width="13" />}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Form tìm kiếm từ khóa bài báo */}
        <div className="article-table-search-form">
          <FilterSearch
            initialValue={filters.search}
            onSearchChange={handleSearchChange}
            placeholder={t("article.timBaiBaoDoiTuKhoa", "Tìm bài báo, DOI, từ khóa...")}
            className="article-table-search"
            actionButton={null}
          />
        </div>
      </div>

      {/* Active chips row */}
      {activeChips.length > 0 && (
        <div className="article-selected-filters" aria-label="Selected article filters">
          {activeChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="article-selected-filter-chip"
              onClick={chip.onClear}
              title={`Xóa lọc: ${chip.value}`}
            >
              <span>{chip.value}</span>
              <Icon icon="lucide:x" width="13" />
            </button>
          ))}

          <button
            type="button"
            onClick={clearFilters}
            className="article-clear-btn article-clear-inline"
          >
            Clear filters
          </button>
        </div>
      )}
    </FilterCard>
  );
}
