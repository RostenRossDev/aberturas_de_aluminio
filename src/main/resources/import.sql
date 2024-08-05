-- usuarios
INSERT INTO PROGRAMAR.users (username, password, enabled) VALUES ('user','$2a$10$p7LHk/KItqUEAyK2VksvzeOMeZWi7TXbA7uta3bMOz89uzlNeSe3q',1);
INSERT INTO PROGRAMAR.users (username, password, enabled) VALUES ('admin','$2a$10$aT7985FBPnPc2WGcMYwiSeoHHjJKvid214iYR.NQRGaLcKWfa9YK.',1);

-- roles
--INSERT INTO roles
-- usuarios y roles
INSERT INTO PROGRAMAR.authorities (user_id, authority) VALUES (1,'ROLE_USER');
INSERT INTO PROGRAMAR.authorities (user_id, authority) VALUES (2,'ROLE_ADMIN');
INSERT INTO PROGRAMAR.authorities (user_id, authority) VALUES (2,'ROLE_USER');