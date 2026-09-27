import { Card } from "react-bootstrap";
import QuizMainListItem from "./quizItem/quizMainListItem";
import Loader from "../common/loader";
import styles from "../../styles/components/quizCard.module.scss";
import { useSemanticSearch } from "../../hooks/useSemanticSearch";

type SemanticSearchResultsProps = {
  q: string;
};

const messageStyle = { textAlign: "center", padding: "1rem", color: "#666" } as const;

const SemanticSearchResults = ({ q }: SemanticSearchResultsProps) => {
  const { data, isLoading, isError, error } = useSemanticSearch(q);

  if (isLoading) return <Loader />;

  if (isError) {
    throw error;
  }

  if (data?.search.offTopic) {
    return (
      <div style={messageStyle}>
        <p>That doesn&apos;t look like a quiz search.</p>
        <p>Try describing a topic, for example &quot;React hooks for beginners&quot;.</p>
      </div>
    );
  }

  const quizzes = data?.data ?? [];

  if (quizzes.length === 0) {
    return (
      <div style={messageStyle}>
        <p>No quizzes match &quot;{q}&quot;.</p>
        <p>Try a broader description, for example without the difficulty.</p>
      </div>
    );
  }

  const { category, complexity } = data?.search.appliedFilters ?? {};
  const understood = [category, complexity].filter(Boolean).join(" · ");

  return (
    <div>
      {understood && <p style={{ color: "#666", margin: "0 0 1rem" }}>Showing: {understood}</p>}
      <div className={styles.gridWrapper}>
        <ul className={styles.gridContainer} aria-label={`Search results for ${q}`}>
          {quizzes.map((quiz) => (
            <li key={quiz.id} className={styles.gridItem}>
              <Card className={styles.gridCard}>
                <QuizMainListItem quiz={quiz} />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SemanticSearchResults;
