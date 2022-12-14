import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	Row,
	Col,
	Card,
	Container,
	Dropdown,
	DropdownButton,
	Form,
	Button,
} from "react-bootstrap";
import { generatePlaylist } from "./GeneratePlaylist";

export const Playlists = () => {
	const [visibility, setVisibility] = useState("Private");
	const [length, setLength] = useState(50);
	const [preference, setPreference] = useState("Artists");
	const [time, setTime] = useState("short_term");
	const [name, setName] = useState("");
	const [complete, setComplete] = useState(false);

	const getTime = text => {
		switch (text) {
			case "short_term":
				return "Short Term (1 month)";

			case "medium_term":
				return "Medium Term (6 month)";

			case "long_term":
				return "Long Term (All Time";
		}
	};

	return (
		<Container>
			<Row>
				<Col xs={12}>
					<Heading>
						{complete
							? "Finished Generating! Open spotify to view your playlist!"
							: "Generate a personalized playlist tailored to you:"}
					</Heading>
					<Menu>
						<Row className="justify-content-center">
							<Col xs={6}>
								<SmallCard
									bg="dark"
									text="light"
									style={{
										display: "flex",
										flexDirection: "row",
									}}>
									<h3 style={{ margin: "14px 10px 10px 0" }}>
										Visibility:
									</h3>
									<DropdownButton
										variant="success"
										title={visibility}
										style={{ margin: "10px 0 0 10px" }}>
										<Dropdown.Item
											onClick={() =>
												setVisibility("Private")
											}>
											Private
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() =>
												setVisibility("Public")
											}>
											Public
										</Dropdown.Item>
									</DropdownButton>
								</SmallCard>
							</Col>
							<Col xs={6}>
								<SmallCard
									bg="dark"
									text="light"
									style={{
										display: "flex",
										flexDirection: "row",
									}}>
									<h3 style={{ margin: "14px 10px 10px 0" }}>
										Playlist Length:
									</h3>
									<DropdownButton
										variant="success"
										title={length + " Tracks"}
										style={{ margin: "10px 0 0 10px" }}>
										<Dropdown.Item
											onClick={() => setLength(20)}>
											20
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => setLength(30)}>
											30
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => setLength(40)}>
											40
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => setLength(50)}>
											50
										</Dropdown.Item>
									</DropdownButton>
								</SmallCard>
							</Col>
						</Row>
						<Row className="justify-content-center">
							<Col xs={4}>
								<Card
									style={{
										borderColor: "rgb(40,40,40)",
										borderRadius: "20px",
									}}
									bg="dark"
									text="light">
									<Card.Body>
										<Card.Title
											style={{ fontSize: "30px" }}>
											Preferences
										</Card.Title>
										<Card.Text>
											Choose what your playlist is made
											out of. Would you like top songs
											from your favourite artists, some of
											your favourite tracks, or a little
											bit of both?
										</Card.Text>
										<div
											style={{
												marginLeft: "22%",
											}}>
											<DropdownButton
												variant="success"
												title={preference}>
												<Dropdown.Item
													onClick={() =>
														setPreference("Artists")
													}>
													Top Artists
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() =>
														setPreference("Tracks")
													}>
													Top Tracks
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() =>
														setPreference("Both")
													}>
													A bit of both
												</Dropdown.Item>
											</DropdownButton>
										</div>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={4}>
								<Card
									style={{
										borderColor: "rgb(40,40,40)",
										borderRadius: "20px",
									}}
									bg="dark"
									text="light">
									<Card.Body>
										<Card.Title
											style={{ fontSize: "30px" }}>
											Time Frame
										</Card.Title>
										<Card.Text>
											Choose the time frame that is
											analyzed when creating your
											playlist. Your top artists and
											tracks will be from this time frame.
										</Card.Text>
										<div
											style={{
												marginLeft: "22%",
											}}>
											<DropdownButton
												variant="success"
												title={getTime(time)}>
												<Dropdown.Item
													onClick={() =>
														setTime("short_term")
													}>
													Short Term (1 month)
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() =>
														setTime("medium_term")
													}>
													Medium Term (6 months)
												</Dropdown.Item>
												<Dropdown.Item
													onClick={() =>
														setTime("long_term")
													}>
													Long Term (All Time)
												</Dropdown.Item>
											</DropdownButton>
										</div>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={4}>
								<Card
									style={{
										borderColor: "rgb(40,40,40)",
										borderRadius: "20px",
									}}
									bg="dark"
									text="light">
									<Card.Body>
										<Card.Title
											style={{ fontSize: "30px" }}>
											Name of Playlist
										</Card.Title>
										<Card.Text>
											Give your playlist a name.
											<br />
											(default name is "My Playlist")
										</Card.Text>
										<div
											style={{
												marginTop: "54px",
											}}>
											<Form>
												<Form.Control
													type="text"
													size="lg"
													placeholder="Playlist Name"
													value={name}
													onChange={e => {
														setName(e.target.value);
													}}
												/>
											</Form>
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Menu>

					<Row className="justify-content-center">
						<Generate
							variant="success"
							onClick={() => {
								setComplete(false);
								generatePlaylist(
									{
										name,
										time,
										preference,
										length,
										visibility,
									},
									setComplete
								);
							}}>
							Generate Playlist
						</Generate>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

const Heading = styled.h2`
	color: rgb(29, 185, 84);
	margin: 20px 0 0 0;
`;

const Menu = styled.div`
	background-color: rgb(35, 35, 35);
	padding: 30px;
	margin: 30px 0 20px 0;
	border-radius: 30px;
`;

const SmallCard = styled(Card)`
	border-color: rgb(40, 40, 40);
	border-radius: 20px;
	margin: 0 0 30px 0;
	height: 80px;
	justify-content: center;
	align-items: center;
`;

const Generate = styled(Button)`
	width: 500px;
	height: 80px;
	border-radius: 50px;
	font-size: 40px;
	font-weight: 500;
	margin: 20px 0 600px 0;
`;
