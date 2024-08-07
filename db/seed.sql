\c nycrunningsocial_dev

INSERT INTO users (username, email, password, age, dob, profile_pic, is_active, gender) VALUES
('Nadia Matos', 'nmatos@gmail.com', 'password123', 32, '1991-11-23', 'https://ibb.co/MBw8dX4', TRUE, 'female'),
('Paul Rudd', 'prudd@gmail.com', 'password456', 55, '1969-02-06', 'https://ibb.co/947z4ts', FALSE, 'male');

INSERT INTO locations (location, address, user_id) VALUES
('WEST 100 STREET', 'Manhattan 10023', 1),
('PROSPECT PARK WEST', 'Brooklyn 11215', 2);

INSERT INTO paths (name, directions, miles, location_id) VALUES
('Central Park Loop', 'Starting Point: 59th Street & 7th Avenue; Ending Point: 59th Street & 7th Avenue; Elevation Gain: 290 feet / 88 meters; Terrain: Pavement; Route: The loop circles the entire park, connecting East Drive and West Drive at Center Drive (bottom of the loop) and at Central Park North & Adam Clayton Powell Jr. Blvd (top of the loop)', 6, '1'),
('Prospect Park Loop', 'Starting Point: Grand Army Plaza; Ending Point: Grand Army Plaza; Elevation Gain: 157 feet / 48 meters; Terrain: Paved asphalt; Route: The loop is a popular route for birding, mountain biking, and road biking. It takes an average of 1 hour and 11 minutes to complete', 3.6, 2);

INSERT INTO path_types (difficulty, path_id) VALUES
('Easy', '1'),
('Moderate', '2');

INSERT INTO running_groups (name, location_id) VALUES 
('Central Park Runners', '1'),
('Prospect Park Joggers', '2');

INSERT INTO user_running_groups (user_id, running_groups_id) VALUES
('1', '1'),
('2', '2');


