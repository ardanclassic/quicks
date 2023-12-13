import ClipLoader from "react-spinners/ClipLoader";

function Loading({ loading, size, color, css }: any) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color || `#C4C4C4`}
        loading={loading}
        size={size || 75}
        cssOverride={{
          display: css?.display || "block",
          margin: css?.margin || "24px auto",
          borderWidth: css?.borderWidth || "8px",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
