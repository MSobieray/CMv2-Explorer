This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
npm i && npm run dev
# or
yarn install && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Details
An application using client side rendering to display minted NFTs belonging to a [MetaPlex Candy Machine](https://docs.metaplex.com/candy-machine-v2/introduction) without the need to connect a wallet. This is using Solana's Devnet and comes with my candy machine's address pre-populated. It is also built with the [anchor framework](https://github.com/project-serum/anchor) to help with deserializing the JSON-RPC 2.0 responses and working with IDLs and Programs needed to fetch the candy machine's account data.

The UI shows the information about the candy machine and displays any of the NFTs that have been minted by using the [MetaPlex](https://github.com/metaplex-foundation/js-next) `findAllByCandyMachine` method and running the `metadataTask` for each one. Fetching the data this way is slow and I would like to have found a faster solution which would also show the un-minted NFTs. Unfortunately, I was not able to easily find a way to query all the NFTs besides using `findAllByCandyMachine`

## Side Note
This is the first time I have interacted with Solana's blockchain or any blockchain, and I learned a lot! I was happy to dig into this and begin learning how to build DApps. I really enjoyed this and want to keep playing around with it in the future, I hope you enjoy it as much I did building it.



