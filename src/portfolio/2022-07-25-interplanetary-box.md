---
title: Interplanetary Box
image: interplanetary-box.png
category: other
technology: Web3, Typescript, Polygon
featured: true
description: Secure decentralized file storage platform.
---

Secure decentralized file storage platform where users can safely store their files knowing that only they can access them

The project was build for the [HackFS](https://hackfs.com) hackathon. It won the following prizes: **35 Top projects** from IPFS, _honorable mention_ by Tableland, **Best Use** by Valist.io and **Top 10 Project** by Spheron.

---

Interplanetary Box is a secure file storage system. It allows users to deploy their own smart contract and start storing their encrypted files.

It utilizes the power of decentralized storage to store files securely, which before being uploaded are encrypted by an AES encrypting algorithm.

The file's CID is stored in a smart contract where only the owner can access them and the encryption key is also available there, heavily encrypted.

This key is encrypted using a wallet's public key and can only be decrypted by the owner of the wallet's private key using a custom metamask method.

## How it's Made

The project heavily relies on Metamask and IPFS. It generates a custom encryption key that then it's encrypted using the wallet's encryption key.

A smart contract is deployed in the polygon network storing this encrypted key where only the owner can access it.

The smart contract has a dictionary where it stores all the available files and their CID.

When the user wants to upload a file, the dApp fetches the key from the smart contract, decrypts it using a custom metamask method, and then it uses the key to encrypt the file data. After that, the encrypted file is sent to the server where it is uploaded to IPFS and the CiD is returned to the client. Finally, the client updates the dictionary with the name of the new file uploaded and the CiD of this file.

When the user wants to download a file, it fetches its CiD from the smart contract, downloads it from an IPFS gateway URL, and then decrypts the downloaded file using the key in the smart contract.

## Demo video

<a href="https://youtu.be/4UX5Vq8k_j8" target="_blank" class="block md:hidden mx-auto w-fit bg-brand-orange hover:bg-brand-orange/80 text-white font-bold py-2 px-4 rounded-lg transition-colors no-underline">Watch on Youtube</a>

<div class="hidden md:block aspect-w-16 aspect-h-9 my-8 w-full">
  <iframe class="w-full h-[500px] rounded-xl border-2 border-white/20 shadow-lg" src="https://www.youtube.com/embed/4UX5Vq8k_j8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Code and deployed app

You can see the submission at [Interplanetary box entry page](https://ethglobal.com/showcase/interplanetary-box-3yx0f)

You can find the deployed version at [https://interplanetary-box.com](https://interplanetary-box.com)

You can find the source code at [github.com/Bullrich/interplanetary-box](https://github.com/Bullrich/interplanetary-box)
