import * as React from "react";

import { Link } from "react-router-dom";

export interface CardProps {
  chirps: { id: string; name: string; chirp: string };
}

const CardMod: React.SFC<CardProps> = props => {
  const { id, name, chirp } = props.chirps;
  return (
    <div className="col-md-8">
      <div className="card mb-1 border border-dark rounded shadow-lg">
        <div className="card-body">
          <h4 className="card-title">
            {name} <span className="says">says:</span>
          </h4>
          <p className="card-text">{chirp}</p>
          <Link to={`/editing/${id}`} className="btn btn-primary">
            Edit Chirp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardMod;
