import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import {deleteStudentDetail, getAllStudents} from "../lib/DataFetcher";

const mainCol = {
	width: '80%'
};

const cols = {
	width: '10%'
};

/**
 * Komponenta nacita list studentov pre uzivatela
 */
const StudentList = () => {
	const [students, setStudents] = React.useState([]);

	/**
	 * Metoda pomocou fetchu prebere hodnoty studntov pre dalsie spracovanie
	 */
	const getStudents = () => {
		getAllStudents(setStudents);
	};

	React.useEffect(() => {
		getStudents();
	}, []);

	/**
	 * Metoda odstranuje uzivatela z DB cez REST Delete
	 * @param event - objekt udalosti ktory ma urcite vlastnosti
	 */
	const deleteStudent = (event) => {
		const id = event.target.value;
		alert("Deleting student with id: " + id);

		deleteStudentDetail(id).then(() => getStudents());
	};

	return (
		<div>
			<h2>Student list</h2>

			<table>
				<tbody>
				{students.map(item => (
					<tr key={item.id}>
						<td style={mainCol}><p>{item.firstName} {item.lastName}</p></td>
						<td style={cols}><p><NavLink to={`/student/${item.id}`}>Detail</NavLink></p></td>
						<td style={cols}><p><NavLink to={`/studentEdit/${item.id}`}>Edit</NavLink></p></td>
						<td style={cols}>
							<button onClick={deleteStudent} value={item.id}>Delete</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>

			<div className="flex-container">
				<h3><NavLink to={'/post'}>Create student</NavLink></h3>
			</div>
		</div>
	);
};

export default withRouter(StudentList);