import { Resource } from "../models/resource";
import { connect } from "../database";

export class ResourceService {
  public async addResource(payload: Resource) {
    const conn = await connect();
    const result = await conn.query(
      `INSERT INTO resources 
      (title,description,score,status,completed) 
      VALUES 
      ('${payload.title}','${payload.description}','${payload.score}','${
        payload.status
      }','${payload.completed ? 1 : 0}')`
    );
    let message = "Error in creating Resource";
    if (result) {
      message = "Resource created successfully";
    }

    return { message };
  }

  public async putResource(id: number, payload: Resource) {
    const conn = await connect();
    const result: any = await conn.query(
      `UPDATE resources SET ? WHERE id = ?`,
      [payload, id]
    );
    return result[0];
  }

  public async getResource(filter: any) {
    let where = "";
    if (Object.keys(filter).length > 0) {
      let temp = [];
      if (filter.status) temp.push(` status='${filter.status}' `);
      if (filter.completed) temp.push(` completed=${filter.completed} `);
      if (temp.length > 0) where = `WHERE ${temp.join("AND")}`;
    }
    const conn = await connect();
    const data = await conn.query(`SELECT * FROM resources ${where}`);
    return data[0];
  }
  public async getResourceById(id: number) {
    const conn = await connect();
    const data: any = await conn.query(
      `SELECT * FROM resources WHERE id=${id}`
    );

    return data[0].length > 0 ? data[0][0] : null;
  }
  public async deleteResource(id: number) {
    const conn = await connect();
    const result = await conn.query(`DELETE FROM resources WHERE id=${id}`);
    return result[0];
  }
}
