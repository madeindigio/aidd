# Effective AI-Driven Development Guide

Many of you have experienced that AI assistants can be incredibly useful for accelerating development, but sometimes they can generate incorrect or inefficient code. This guide will help you make the most of AI assistants like GitHub Copilot and Kilo Assistant, ensuring they produce high-quality and efficient code.

Here I indicate some recommended practices for working with AI assistants in your development workflow:

1. Set up your project with AI configuration. In this repo you have a template for [Kickstart](https://github.com/madeindigio/aidd/tree/main/kickstart-template) that includes recommended configurations for Copilot and VSCode using the most important MCP servers to accelerate and optimize development (see MCP Servers section).
   
2. Once the template is used, you will use "remembrance" tools like Serena or Remembrances to store everything important in your development or tasks that the AI is performing, normally the template will have configured instructions so that the AI uses it autonomously by saving relevant memories and consulting before each task the related memories that may be relevant to the task. **If at any point you see that upon finishing a task, it has not saved something in memories that you consider important, tell it in the chat and ask it to save it.**
   
3. Use a plan.md file, if you use Serena MCP, you can use the folder `.serena/memories/plan.md` since this folder will store any information that serves as a knowledge base in markdown format, both Serena and Remembrances will use these files as a knowledge base to answer your questions and generate code. The difference is that Remembrances also has mechanisms to save relationships, entities with metadata and other related elements in a knowledge graph that can be very useful for complex projects. 

The plan.md should indicate that it is the project task planning file, you will have tasks already done and others not, you can use markdown syntax to organize the tasks, for example:

```markdown
# Development plan for project X

- [x] Task 1: Set up the development environment
- [x] Task 2: Implement authentication functionality
- [ ] Task 3: Develop REST API for user management
- [ ] Task 4: Create user interface with React
- [ ] Task 5: Integrate API with user interface
```

4. If you are sufficiently specific in the definition of each task, indicating what tools to use, what to use to search for information from a library, or what part of the code you want to review in each task, the AI will be able to perform the tasks autonomously without you having to tell it anything else. If not, it will ask you for more information or tell you what it needs to complete the task. Your prompt can be as simple as:
> *"considering the plan.md continue with the pending tasks taking into account the tasks performed previously in case they are relevant to your current work."*

5. If you are working with an existing code project, make sure you have generated an initial knowledge base of the entire project, I explain now how to do it:

   - Use Serena MCP to index all the project's code. You can use the `serena index` command to create a semantic index of all the code, which will allow the AI to better understand the structure and relationships within the code.
   - If the project is very large, you can use Remembrances MCP to create specific memories of important parts of the project, such as key modules, critical functions or any other relevant information that can help the AI better understand the context.
   - Make sure both MCP servers are configured correctly in your development environment and that the AI can access them.
   - Start interacting with the AI in agent mode, asking it to review the existing code, and document using Serena or Remembrances the project structure, the main functions, all those details that you know exist, and that you consider relevant for other programmers or the AI itself in the future, for example:
   - *"Review the project code and create a summary of the main functions, modules and any other relevant information that can help understand the project structure. Use Serena to index the code and Remembrances to create specific memories of important parts of the project."*
   - *"Review the database migrations and the schemas that the models generate and create a summary of the database structure, including tables, relationships and any other relevant information. Also generate a mermaid diagram of the database structure."*
   - *"Review the API endpoints and create a summary of them, including routes, HTTP methods, parameters and any other relevant information. Use this summary to generate API documentation in OpenAPI format."*
   - *"Review the user interface components and create a summary of them, including their structure, props and any other relevant information. Use this summary to generate component documentation in Storybook format."*
  
6. Sometimes it will be interesting for the AI to be able to read the logs from some folder, compilation logs or test errors, for that you can use MyCommandMCP to create commands that read the logs and save them in Remembrances memories or in markdown files in the `.serena/memories/` folder so that Serena can index them and use them as a knowledge base.