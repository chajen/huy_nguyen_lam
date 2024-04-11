import { Router, Request, Response } from "express";
import { Resource } from "./models/resource";
import { body, Result, validationResult } from "express-validator";
import { ResourceService } from "./services";
const router = Router();
let resources: Resource[] = [];
const resourceService = new ResourceService();

const resourceValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("status").notEmpty().withMessage("Status is required"),
  body("score").notEmpty().withMessage("Score is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

router.post(
  "/",
  resourceValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const resource: Resource = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      score: req.body.score,
      completed: false,
    };
    resources.push(resource);
    const result = await resourceService.addResource(resource);
    res.status(201).json(result);
  }
);

router.get("/", async (req: Request, res: Response) => {
  const filter = req.query;
  const result = await resourceService.getResource(filter);
  console.log("result", result);
  res.json(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  const resource = await resourceService.getResourceById(Number(req.params.id));
  if (!resource) {
    res.status(404).send("Resources not found");
  } else {
    res.json(resource);
  }
});

router.put(
  "/:id",
  resourceValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const resource = await resourceService.getResourceById(
      Number(req.params.id)
    );
    if (!resource) {
      res.status(404).send("resources not found");
    } else {
      const resource: Resource = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        score: req.body.score,
        completed: req.body.completed,
      };
      const result = await resourceService.putResource(
        Number(req.params.id),
        resource
      );
      res.json(result);
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const resource = await resourceService.getResourceById(Number(req.params.id));
  if (!resource) {
    res.status(404).send("Resource not found");
  } else {
    const result = await resourceService.deleteResource(Number(req.params.id));
    res.status(204).json(result);
  }
});

export default router;
