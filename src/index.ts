import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Routing and Handlers
import { usersRouter } from "./users/users.router";
import { eventsRouter } from "./events/events.router";
import { teamsRouter } from "./teams/teams.router";
import { teamMembersRouter } from "./team_members/teamMembers.router";
import { statesRouter } from "./states/states.router";
import { profileRouter } from "./profile/profile.router";
import { scoresRouter } from "./scores/scores.router";
import { sportsRouter } from "./sports/sports.router";
import { loginRouter } from "./login/login.router";
import { favoriteSportsRouter } from "./favorite_sports/favoriteSports.router";
import { challengesRouter } from "./challenges/challenges.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { Auth } from "./middleware/auth.middleware";

// Use dotenv for environment variables
dotenv.config();

// Check for environment port. Exits if not found
if (!process.env.PORT) {
    process.exit(1);
};
const PORT: number = parseInt(process.env.PORT as string, 10);

// Sets express as app. Enable helmet, cors and json responses
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({limit: '1mb'}));

// Routing
app.use('/login', loginRouter);
app.use("/users", Auth.verifyToken, usersRouter);
app.use("/events", Auth.verifyToken, eventsRouter);
app.use("/teams", Auth.verifyToken, teamsRouter);
app.use("/team-members", Auth.verifyToken, teamMembersRouter);
app.use("/states", Auth.verifyToken, statesRouter);
app.use("/profile", Auth.verifyToken, profileRouter);
app.use("/scores", Auth.verifyToken, scoresRouter);
app.use("/sports", Auth.verifyToken, sportsRouter);
app.use("/favorite-sports", Auth.verifyToken, favoriteSportsRouter);
app.use("/challenges", Auth.verifyToken, challengesRouter);

// Error Handling and 404
app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot ? : {
        data: any;
        accept(
            dependencies: string[],
            callback ? : (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback ? : () => void): void;
        accept(errHandler ? : (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
};

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
};