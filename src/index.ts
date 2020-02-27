import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Routing and Handlers
import { usersRouter } from "./users/users.router";
import { eventsRouter } from "./events/events.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

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
app.use(express.json());

// Routing
app.use("/users", usersRouter);
app.use("/events", usersRouter);

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