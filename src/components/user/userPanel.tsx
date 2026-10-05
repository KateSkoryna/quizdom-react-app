import type { ReactNode } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "../../styles/pages/profile.module.scss";

type PanelHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export const PanelHeader = ({ title, subtitle, action }: PanelHeaderProps) => (
  <div className={styles.panelHeader}>
    <div>
      <h2 className={styles.panelTitle}>{title}</h2>
      {subtitle && <p className={styles.panelSubtitle}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

type PanelEmptyProps = {
  icon: ReactNode;
  children: ReactNode;
};

export const PanelEmpty = ({ icon, children }: PanelEmptyProps) => (
  <div className={styles.empty}>
    <span className={styles.emptyIcon} aria-hidden="true">
      {icon}
    </span>
    <p className={styles.emptyText}>{children}</p>
  </div>
);

type PanelPaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const PanelPagination = ({ currentPage, totalPages, onChange }: PanelPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <MdChevronLeft aria-hidden="true" />
      </button>
      <span aria-live="polite">
        {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <MdChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
};
