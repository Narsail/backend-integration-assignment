# Backend Engineer Technical Assignment
## Introduction
This assessment aims to assess the technical, analytical, and collaboration skills of
the candidates for backend integration positions in Sensorfact.

In this assignment, we included a few of the technologies that we use in our
existing products:

- **GraphQL:**
  Within Sensorfact we expose most of our data regarding measurements, machine
  specific configuration and industry knowledge via a GraphQL API.
- **Serverless:**
  A big part of our backend consists of NodeJS services in a
  Kubernetes cluster, but we are moving the logic of simple services to AWS Lambda
  functions and deploy these using Serverless.
- **TypeScript:**
  A part of our code is written in plain JavaScript. All
  new projects use TypeScript, because we like the benefits that the type system
  offers us during development, reviews, and testing.

We understand that you may not be familiar with these technologies. In the short term, working using your preferred 
tech stack will be possible. You can implement the solution using the tech stack you feel more comfortable
working with. Nevertheless, in the long term, it will be beneficial if we are as homogenous as possible within 
Sensorfact, so we would greatly appreciate it if you could try it and go as close as possible to our tech stack. 
It will also make it easier for us to evaluate your solution.

## Process & Guidelines

>- **We aim to timebox the assignment to 4 hours**, but feel free to dedicate as much time as you consider necessary. **We
   will expect that you completed at least the two mandatory requests**
>- Make a conscious decision on what you want to focus on: it's ok if you
   cannot complete the entire assignment.
>- Send us your solution before the technical interview: link to a repository.
   You can, for example, fork this repository.
>- The assignment includes a description of a problem to solve, which could potentially lack
   details. Feel free to make assumptions if needed, or contact us for clarification if you consider it necessary.
>- Take this assignment as an opportunity to show us your style: what you like to
   work on, what you find important, how you address problems,etc.
>- **During the technical interview, we invite you to present your solution and discuss
   it together as a team**: which decisions you took and why, questions about specific parts of the code,
   libraries you have used, how easy and maintainable is the code,etc.

## Problem to solve (an imaginary one, of course ;))

Sustainability is starting to take a key role in every product or solution launched into the market, and software
systems are not an exception. It is not enough anymore to create and deploy in time complex and innovative
systems which bring value to customers; they also need to be efficient. They need to
be sustainable and consume the minimum amount of resources in their operations.

As you probably have heard, one of the principal arguments against using Bitcoin is the amount of energy needed to keep
the system running. To evaluate the sustainability of the blockchain network in which Bitcoin runs, we
want to create a platform to monitor the energy spent on financial transactions using Bitcoin.

The platform will visualize the energy consumed by the network and potentially calculate energy waste. Our frontend
development team will need an API (preferably GraphQL) to connect to which will provide this information. The platform should
be able to perform the following operations (already sorted by priority):

- [x] **Mandatory:** Provide the energy consumption per transaction for a specific block.
- [x] **Mandatory:** Provide the total energy consumption per day in the last `x` number of days. It could be that you are going to hit rate limiting
  errors, it is expected and we would like to see what possible solutions you implemented
- [ ] **Optional Feature**: Optimize the number of calls made to the Blockchain API to avoid asking for the
  same information multiple times.
- [ ] **Optional Feature**: Provide the total energy consumption of all transactions performed by a specific wallet address.

Even if it is too soon in the product's lifetime to think about non-functional requirements, it will be beneficial to
build it considering that we hope to scale the solution and avoid significant refactoring.

## Assumptions

**- You can use a simple model of the BTC network: the network is composed of blocks (each block identified by a unique `hash` value
or a block index). Each block contains a set of transactions, each transaction also has a unique `hash` by which it can be identified.**
- Every transaction takes up a variable amount of storage space inside the block, indicated by the `size` field (in bytes).
- Assume that the energy cost per byte is 4,56 KwH.
- You can use the public Blockchain API from blockchain.com to retrieve information
  (https://www.blockchain.com/explorer/api/blockchain_api), for example:
    - Latest block: https://blockchain.info/latestblock
    - Information of blocks in a day: https://blockchain.info/blocks/$time_in_milliseconds?format=json
    - Information of a single block: https://blockchain.info/rawblock/$block_hash
    - Information of a single transaction: https://blockchain.info/rawtx/$tx_hash
    - Information on transactions for a specific wallet address: https://blockchain.info/rawaddr/$bitcoin_address

## Project code
This project is comes with a pre-configured GraphQL server, hosted as a serverless
function to get you started on the assignment. However, feel free to write your
own implementation if you prefer.

### Running the project
Requirements:
- NodeJS 18.x (run `nvm use` in root folder)
- Yarn cli
- Serverless framework: run `npm install -g serverless`
- locally running Redis on port `6379`

Install dependencies:

```sh
yarn
```

**Important:** To run locally, `line 9` in `blockchain_repository.ts` needs to be uncommented and `line 10` needs to be commented to point the lambda instance to the localhost redis.

```
//  return createClient() // for local usage
  return createClient({url: 'redis://redis:6379'})
```

Run the serverless function in offline mode:

```sh
yarn start
```

The server will be ready at: `http://localhost:4000/graphql`

#### Example Queries

```graphQL
query BlockQuery {
  block(hash: "0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103") {
    blockHash
    transactions {
      transactionHash
      energyConsumption
      energyConsumptionUnit
    }
  },
}

query LastXDaysQuery {
  energyConsumptionOfLastX(days: 1) {
    dateInMilliseconds
    energyConsumption
    energyConsumptionUnit
  }
}
```

### Running Docker Compose

```
docker compose up
```

### Running Test

This project utilizes the vitest framework and has tests for
- Testing the 3rd party API in `blockchain_api.test.ts`
- Testing the `date_mapping.ts` for the second requirement
- Testing the `energy_calculation.ts` for the first and second requirement

```sh
yarn test
```

### Comments on the Solution

As a primer: While I have done one or two typescript based prototypes with react-native and node.js in the past, I never had to productionize it.
My recent experience in Clipboard Health was focused on reviewing code, rarely writing some but it didn't include setting up a project from scratch.
Combining that with my lack of experience with graphQL I only reached the 3rd requirement and did not implement any proper error handling.
I wanted to stay true to the time-limit (Paco communicated ~6hrs) which included some research in how graphql, redis and testing (jest doesn't play nicely out of the box with typescript).

My typical approach to a piece of work, let's say an epic and its stories, is to start with a skeleton that works End2End.
You will find in the first comment that I played around with how to fetch data from an API, how to write a test for said api,
introduce a service layer containing the energy consumption with an accompanying test.
Then I moved to the second requirement which provided some challenges with wrapping my head around those nested promises and how to integrate a rate limiter to not overload the blockchain API.
It was followed by some clean ups and documentation, tailed closely by integrating docker and redis to a) avoid duplicate request and b) provide an environment that should work across different operating systems (I learned that the javascript environment is prone to issues due to globally installed tools that might lead to missing dependency declarations).

There are a couple of things I noticed while implementing and some that I would plan to follow up on anyway, to make that feature production ready:

- I value good integration (and E2E) tests over unit tests and believe in the [Testing Trophy](https://dzrge5zzbsh6q.cloudfront.net/Testing-Pyramid_Figure-4.jpg) rather than the testing pyramid due to emerging behavior in systems that can't be captured by unit tests. Due to time limitations I didn't explore how to test graphql APIs with a test framework, but it would be high on my priority list before this goes to production.
- Serverless Dockerization: it seems to support [dockerization](https://www.serverless.com/blog/container-support-for-lambda), something that could enable pulling environment variables from the docker definition
- Error handling: the mechanism to fetch the total energy consumption of a day does result in json errors occationally, I suspect it does have something to do with failed request which should be a) translated into proper errors for the graphQL consumer
- b) result in the implementation of a retry mechanism for cases where the rate limiting failed
- Serverless is currently set up with Node16 (and does not support node18 as far as my quick skim went) but the project is set up with Node18 due to Vitests requirement. To productionize I would spend more time to set up jest with node16 and typescript and remove vitest. I have chosen it to not loose too much time with configuration issues.

Thanks for giving me the chance on solving this assignment. It was a fun activity and I'm looking forward to our session.