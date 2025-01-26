## Questions

## Discuss your strategy and decisions implementing the application. Please, consider time complexity, effort cost, technologies used and any other variable that you understand important on your development process.

For this project, the core objective was to build a system that processes CSV data to track the support and opposition of bills by legislators. The primary technologies used were NestJS for backend services, NextJs and React for frontend, and the fs module for reading CSV files.

A key strategy was to adopt Clean Architecture principles, which allow for a well-organized structure that separates concerns into distinct layers, ensuring that business logic and infrastructure remain decoupled. Below are the key components of the system and how they contribute to the architecture:

Repository Layer: The repository implementation reads data from CSV files. I used an interface (CsvReader) to abstract the implementation of the CSV reading logic. This means that if I later decide to fetch data from a database or any other source, I only need to change the implementation of the CsvReader without touching the rest of the application. This separation between the interface and the implementation ensures that the core logic is agnostic to data source changes. This decoupling is a core principle of Clean Architecture. The repository provides methods to retrieve legislator, bill, vote, and vote result data. Each method is defined in the CsvReader interface, which guarantees consistency and clarity for the service layer, while its concrete implementation (CsvReaderImpl) deals with how data is loaded and processed.

Entities (Bill, Legislator): In Clean Architecture, entities encapsulate the core business logic. The Bill and Legislator classes hold the logic for counting supporters and opposers of bills, or for tracking the supported and opposed bills by a legislator. These entities are independent of the framework or infrastructure layers, which means they can be easily tested in isolation.

Use Cases (GetBillStatistics, GetLegislatorStatistics): The use cases serve as the application's business logic layer, orchestrating the interaction between the entities and repositories. Each use case implements a specific task (such as calculating statistics for bills or legislators). This encapsulation ensures that the application logic is isolated from external dependencies, like how data is retrieved or how it is presented. By using use cases, I also ensure that the application remains testable and flexible. For example, if we want to modify the logic of calculating statistics, we can do so within the use cases without affecting other parts of the application.

Controller Layer: The controller layer serves as the entry point for HTTP requests. It communicates with the use cases, which in turn interact with entities and repositories. This layer is kept thin, delegating the actual processing logic to the use cases, further reinforcing the decoupling between external interfaces (HTTP) and business logic.

Time Complexity and Performance Analysis

For the GetLegislatorStatistics use case, the process begins by retrieving the list of legislators via the `getLegislators()` method. Assuming the number of legislators is `n`, this operation takes **O(n)** time. Similarly, retrieving the vote results through `getVoteResults()` takes **O(m)** time, where `m` is the number of vote results. After retrieving the data, we create a `Map` to store legislators, iterating through the `legislatorsData` array and adding each legislator, which takes **O(n)** time. The next step involves iterating over the `voteResults`, where for each entry, we look up the legislator in the `Map` and increment the statistics based on the vote type. This step involves **O(m)** time due to the iteration over vote results and the constant-time lookup in the `Map`. Finally, converting the `Map` values to an array requires **O(n)** time. Thus, the overall time complexity for this use case is **O(n + m)**, where `n` is the number of legislators and `m` is the number of vote results.

The GetBillStatistics use case starts by retrieving the legislators, bills, votes, and vote results data using the `getLegislators()`, `getBills()`, `getVotes()`, and `getVoteResults()` methods. These operations take **O(n)**, **O(p)**, **O(q)**, and **O(r)** time respectively, where `n` is the number of legislators, `p` is the number of bills, `q` is the number of votes, and `r` is the number of vote results. After retrieving the data, we create `Map` objects to store legislators, votes, and bills, iterating over the respective arrays and adding items to the maps. The time complexity of these insertions is **O(n)**, **O(q)**, and **O(p)**, respectively. The next step involves iterating over the `voteResults` and looking up the corresponding vote and bill in the `votes` and `bills` maps. This operation takes **O(r)**, as each lookup in a `Map` is **O(1)**. Finally, converting the `Map` values to an array takes **O(p)**. The overall time complexity for this use case is **O(n + p + q + r)**, where `n` is the number of legislators, `p` is the number of bills, `q` is the number of votes, and `r` is the number of vote results.

Both use cases involve linear time complexities, with the overall time complexity being **O(n + m)** for GetLegislatorStatistics and **O(n + p + q + r)** for GetBillStatistics. This ensures that the system handles large CSV files efficiently, with the main operations being simple iterations and constant-time lookups. The modular design of the system, where CSV data is read and processed separately from the business logic, allows the application to scale effectively as the volume of data grows.

Effort Cost:

Building reusable components, such as the CSV reader and entity classes, took a significant initial effort, but once these were implemented, the remaining tasks—such as creating the use cases and controllers—were relatively straightforward. The modular structure, guided by Clean Architecture, ensured that as the project grew, adding new functionality (like new columns or reports) would require minimal effort. By separating concerns into interfaces, entities, use cases, and controllers, I was able to implement a flexible and maintainable solution while keeping the effort cost manageable. The ability to test each layer independently was another key benefit, which ensured that the system could evolve without introducing breaking changes.

## How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?

One of the main advantages of using Clean Architecture is that it naturally promotes the separation of concerns, making it much easier to evolve the system without tightly coupling components. Clean Architecture divides the system into layers, which reduces the risk of changes in one area affecting the rest of the system. This separation of concerns provides flexibility and scalability, as you can add or modify features with minimal impact on the overall design.

To accommodate future columns such as "Bill Voted On Date" or "Co-Sponsors," we can adjust the CSV reading logic without affecting other parts of the application. The CSV reader should be made more generic and flexible to handle additional columns dynamically.

- For example, instead of hardcoding the columns when processing CSV data, we can introduce a more flexible schema or configuration for parsing CSV files. This allows new columns to be handled without requiring changes to the core business logic.
- The `CsvReader` interface can be updated to provide methods for retrieving any new data fields. For instance, we could introduce methods like `getBillVotedOnDate()` and `getCoSponsors()`. These methods would return data in a structure that fits the new columns, making it easy to evolve the data ingestion logic.
- The `Bill` and `Legislator` entities should also be designed to accommodate new fields. These entities can be extended to support additional properties such as "votedOnDate" or "coSponsors" for the Bill entity.
- By designing entities with additional properties or methods to manipulate those properties, we ensure that the business logic can easily integrate the new fields.
- By using interfaces and dependency injection (as we do with `CsvReader`), we can decouple the business logic from the implementation details of the CSV reading. This allows us to swap out or extend the CSV parsing logic without affecting the higher layers of the system.
- When new columns are added, the interface can be extended to include methods that retrieve the new fields.

### How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?

The repository layer would need to be updated to generate CSV files based on the in-memory data (list of legislators or bills) rather than reading from them. This layer should be responsible for transforming the data into the proper CSV format and writing it to a file or returning it as a downloadable stream. We can create a method like `generateCSV(data: T[]): string` where `T` is the type of data we are working with (e.g., `Legislator[]` or `Bill[]`). This method would iterate over the data, format it into CSV, and return it.

### How long did you spend working on the assignment?

I spent approximately 7-8 hours working on the assignment
