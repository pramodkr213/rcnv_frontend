import boards from "../../data/boardData.json";

const Board = () => {
  return (
    <section className="mt-3">
      <div className="container">
        <div className="row mt-3">
          {boards.map((director, index) => {
            return (
              <div
                key={index}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
              >
                <div className="card px-2 py-4 d-flex justify-content-center align-items-center card-shadow-director">
                  <div className="profile-director mt-3">
                    <img
                      src={director.imageUrl}
                      width="100%"
                      className="border-radius-img"
                    />
                  </div>
                  <p className="pt-3 fw-bold">{director.position}</p>
                  <p className="">{director.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Board;
