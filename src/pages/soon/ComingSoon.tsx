const ComingSoon = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src="/coming-soon.png"
          alt="Coming Soon"
          className="img-fluid mb-4"
          style={{ maxWidth: "300px" }}
        />
        {/* <h1 className="display-4 text-primary">Coming Soon</h1> */}
        <p className="lead text-muted">
          We're working hard to bring you this page. Please check back later!
        </p>
        <p className="text-secondary">
          Meanwhile, feel free to explore other sections of the website.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
