import axios from "axios";

const hostUrl = `https://springhelloworldapp.herokuapp.com`;
// const hostUrl = `http://localhost:8080`;

export const getStudentDetail = (parameter, callbackFunction) => {
	axios.get(hostUrl + "/REST/getStudent?id=" + parameter)
		.then(({data}) => callbackFunction(data));
};

export const getAllStudents = (callback) => {
	axios.get(hostUrl + "/REST/getStudents")
		.then(({data}) => callback(data));
};

export const deleteStudentDetail = (parameter) => {
	return axios.delete(hostUrl + "/REST/deleteStudent/" + parameter);
};

export const getUniversityOptions = (callback) => {
	axios.get(hostUrl + "/university/getUniversities")
		.then(({data}) => callback(data));
};

export const getFacultyOptions = (uniId, callback) => {
	return axios.get(hostUrl + "/university/getFaculties?uniId=" + uniId)
		.then(({data}) => callback(data));
};