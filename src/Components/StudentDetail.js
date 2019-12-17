import React from "react";
import {NavLink} from "react-router-dom";
import {deleteStudentDetail, getStudentDetail} from "../lib/DataFetcher";

const tableWidth = {
	width: "75%"
};

/**
 * Komponenta zobrazuje detail studenta
 */
const StudentDetail = ({match, history}) => {
	const [student, setStudent] = React.useState([]);
	const [knownLanguages, setKnownLanguages] = React.useState([]);
	const [spokenLanguages, setSpokenLanguages] = React.useState([]);

	const setData = (responseData) => {
		setStudent(responseData);
		setKnownLanguages(responseData.knownLanguages);
		setSpokenLanguages(responseData.spokenLanguages);
	};

	const fetchData = () => {
		const NUM = match.params.studentId;
		getStudentDetail(NUM, setData);
	};

	React.useEffect(() => {
		fetchData();
	}, [match]);

	/**
	 * Metoda nastavi list na zobrazenie udajov uzivatela
	 */
	const listTableLanguages = (language) => {
		if (language.length === 0) {
			return (<tr>
				<td>No language!</td>
			</tr>)
		} else {
			return language.map(item => <tr key={item}>
				<td>{item}</td>
			</tr>)
		}
	};

	/**
	 * Metoda odstranuje uzivatela z DB
	 */
	const deleteStudent = (event) => {
		deleteStudentDetail(event.target.value)
			.then(() => history.push("/"));
	};

	return (
		<div>
			<div className={"student-details"}>
				<h2>{student.firstName} {student.lastName}</h2>
				<div className={"flex-container"}>
					<table style={tableWidth}>
						<tbody>
						<tr>
							<th>First name:</th>
							<td>{student.firstName}</td>
						</tr>
						<tr>
							<th>Last name:</th>
							<td>{student.lastName}</td>
						</tr>
						<tr>
							<th>Country of origin:</th>
							<td>{student.country}</td>
						</tr>
						<tr>
							<th>University:</th>
							<td>{student.university}</td>
						</tr>
						<tr>
							<th>Faculty:</th>
							<td>{student.faculty}</td>
						</tr>
						<tr>
							<th>Type of study:</th>
							<td>{student.typeOfStudy}</td>
						</tr>
						<tr>
							<th>Grade of study:</th>
							<td>{student.grade}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<table>
						<thead>
						<tr>
							<th>Programming languages</th>
						</tr>
						</thead>
						<tbody>
						{listTableLanguages(knownLanguages)}
						</tbody>
					</table>
				</div>
				<div className="column">
					<table>
						<thead>
						<tr>
							<th>Spoken languages</th>
						</tr>
						</thead>
						<tbody>
						{listTableLanguages(spokenLanguages)}
						</tbody>
					</table>
				</div>
			</div>
			<div className={"flex-container"}>
				<div className="inline-boxes">
					<button value={student.id} onClick={deleteStudent}>Delete</button>
				</div>
				<div className="inline-boxes">
					<NavLink to={"/studentEdit/" + student.id}>Edit</NavLink>
				</div>
				<div className="inline-boxes">
					<NavLink to={"/"}>Main menu</NavLink>
				</div>
			</div>
		</div>
	);
};
export default StudentDetail;