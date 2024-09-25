import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Diabetic from "./components/DiabeticModel";
import Home from "./components/Home";
import Admin from "./components/Admin";
import GetUsers from "./components/GetAllUsers";
import UAccount from "./components/UserAcc";
import ServicePage from "./components/Service"
import AboutUs from "./components/AboutUs";
import AllDiabeticHistory from "./components/allUserDiabeticHis";
import DiabeticHistory from "./components/UserDiabeticHistory";
import HeartDiseasePrediction from "./components/HeartModel";
import PredictionHistory from "./components/UserDiabeticHistory";
import HeartDiseaseHistory from "./components/AllUserHreatHis";
import UserHeartDiseaseHistory from "./components/UserHreateHistory";



function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{/* {user && <Route path="/" exact element={<Main />} />} */}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/Diabetic" exact element={<Diabetic />} />
			<Route path="/home" exact element={<Home />} />
			<Route path="/admin" exact element={<Admin />} />
			<Route path="/getUsers" exact element={<GetUsers />} />
			<Route path="/userAcc" exact element={<UAccount />} />
			<Route path="/service" exact element={<ServicePage />} />
			<Route path="/aboutUs" exact element={<AboutUs />} />
			<Route path="/diabeticHis" exact element={<AllDiabeticHistory />} />
			<Route path="/userDiabeticHis" exact element={<DiabeticHistory />} />
			<Route path="/heartPrediction" exact element={<HeartDiseasePrediction />} />
			<Route path="/userDiaHis" exact element={<PredictionHistory />} />
			<Route path="/Heart-his" exact element={<HeartDiseaseHistory />} />
			<Route path="/User-Heart-his" exact element={<UserHeartDiseaseHistory />} />
			{/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
			<Route path="/" exact element={<Home />} />
		</Routes>
	);
} 

export default App;