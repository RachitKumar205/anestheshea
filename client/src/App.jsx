import React, { useState, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Dashboard } from "./components/Dashboard";
import { LoginHeader } from "./components/Login/LoginHeader";
import Background from "./images/loginbg1.jpg";

const spotify = new Spotify();

const getHashParams = () => {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};

export const App = () => {
	const params = getHashParams();
	const [data, setData] = useState({
		loggedIn: params.access_token ? true : false,
		profileInfo: "",
	});

	if (data.loggedIn) {
		spotify.setAccessToken(params.access_token);
	}
	return (
		<>
			{!data.loggedIn ? (
				<Wrapper
					fluid="xs"
					style={{
						backgroundImage: `url(${Background})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						position: "absolute",
						top: "0",
						bottom: "0",
						left: "0",
						right: "0",
					}}>
					<LoginHeader />
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							marginTop: "230px",
						}}>
						<a href="https://anestheshea-backend.azurewebsites.net/login">
							<Login variant="success">Log in with Spotify</Login>
						</a>
						<h7
							style={{
								color: "rgb(150,150,150)",
								marginTop: "20px",
							}}>
							
							{"  "}
							<a
								
								style={{ color: "rgb(170,170,170)" }}>
								Rachit Kumar | Spotify
							</a>
						</h7>
					</div>
				</Wrapper>
			) : (
				<Wrapper fluid="xs">
					<Dashboard />
				</Wrapper>
			)}
		</>
	);
};

const Wrapper = styled(Container)`
	background-color: rgb(18, 18, 18);
	align-items: center;
	justify-content: center;
`;

const Login = styled(Button)`
	width: 200px;
	height: 50px;
	border-radius: 50px;
	font-size: 17px;
	font-weight: 600;
`;
