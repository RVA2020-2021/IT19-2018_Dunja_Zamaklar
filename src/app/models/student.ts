import { Departman } from "./departman";
import { Status } from "./status";

export class Student
{
  id: number;
  ime: string;
  brojIndeksa: string;
  prezime: string;
  departman: Departman;
  status: Status
}
