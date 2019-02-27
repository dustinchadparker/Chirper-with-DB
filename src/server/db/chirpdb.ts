import { query } from "./index";

const all = async () =>
  query(
    "select u.name, c.text as chirp from users u join chirps c on u.id = c.userid;"
  );

const one = async (id: number) =>
  query(
    "select u.name, c.text as chirp from users u join chirps c on u.id =  c.userid where c.id = ?;",
    [id]
  );

const post = async (id: number, text: string, name: string) =>
  query("CALL sp_checking(?,?,?)", [text, name,id]);

const delet = async (id: number) => {
  query("call sp_deleting(?)", [id]);
};

const update = async (text: string, name: string, id: number) => {
  query(
    "CALL sp_updating(?,?,?)",
    [id, text, name]
  );
};

export default {
  all,
  one,
  post,
  delet,
  update
};
