import * as React from "react";
import {getUniversityOptions} from "../../lib/DataFetcher";

const UniversityComponent = () => {
	const [universities, setUniversities] = React.useState([]);

	React.useEffect(() => {
		getUniversityOptions(setUniversities);
	}, []);

	return (
		universities.map(item => <option key={item.university_id} value={item.university_id}>{item.universityName}</option>)
	)
};
export default UniversityComponent