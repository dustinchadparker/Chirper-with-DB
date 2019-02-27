import * as React from "react";
import ChirpCard from "./Card";

export interface IListProps {}

export interface IListState {
  chirps: { id: string; name: string; chirp: string }[];

  name: string;
  chirp: string;
}

class IList extends React.Component<IListProps, IListState> {
  constructor(props: IListProps) {
    super(props);
    this.state = { chirps: [], name: null, chirp: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      let r = await fetch("/api/chirps");

      let data = await r.json();
      let chirps = Object.keys(data).map(key => {
        return {
          id: data[key].id,
          name: data[key].name,
          chirp: data[key].chirp
        };
      });
      chirps.pop();
      chirps.reverse();
      this.setState({ chirps });
    } catch (e) {
      console.log(e);
    }
  }

  async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    if (this.state.chirp && this.state.name) {
      let info = {
        name: this.state.name,
        chirp: this.state.chirp
      };

      e.preventDefault();
      try {
        await fetch("/api/chirps", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(info)
        });
      } catch (e) {
        console.log(e);
      }
      location.reload();
    } else {
      alert("Requires namename and chirp!");
    }
  }

  getData = () => {
    return (
      <div className="row my-3">
        {this.state.chirps.map(chirper => {
          return <ChirpCard key={chirper.id} chirps={chirper} />;
        })}
      </div>
    );
  };

  render() {
    return (
      <section>
        <h1> Time to get Chirping!</h1>
        <div className="row">
          <div className="col-md-8">
            <form
              onSubmit={this.handleSubmit}
              className="form-group  shadow-lg bg-white border border-primary rounded"
            >
              <label>Username:</label>
              <input
                type="text"
                className="form-control "
                value={this.state.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ name: e.target.value })
                }
              />
              <label>Chirp:</label>
              <input
                type="text"
                className="form-control "
                value={this.state.chirp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ chirp: e.target.value })
                }
              />
              <button className="btn btn-info btn-lg shadow-lg mt-2 mb-1">
                Post!
              </button>
            </form>
          </div>
        </div>

        {this.getData()}
      </section>
    );
  }
}

export default IList;
