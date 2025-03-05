import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 

export async function GET(request: Request) {
  try {
    //get the address from the URL
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json({ error: "Invalid Ethereum address" }, { status: 400 });
    }

    //fetch transaction data from Etherscan
    const txRes = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    );
    
    if (!txRes.ok) {
      return NextResponse.json({ 
        error: `Etherscan API returned status ${txRes.status}` 
      }, { status: txRes.status });
    }
    
    const txData = await txRes.json();

    if (txData.status !== "1") {
      return NextResponse.json({ 
        error: txData.message || "Error fetching transactions from Etherscan" 
      }, { status: 400 });
    }

    //process the transaction data for visualization
    const transactions = Array.isArray(txData.result) ? txData.result : [];
    
    //create a network graph with nodes and links
    const nodes = new Map();
    const links = new Map();
    
    //add the central node (the queried address)
    nodes.set(address.toLowerCase(), {
      id: address.toLowerCase(),
      val: 4, //makes the central node larger
      isCenter: true
    });

    //process transactions to build nodes and links
    const maxTransactions = 50; //limit to avoid overloading the visualization
    transactions.slice(0, maxTransactions).forEach((tx: any) => {
      const fromAddress = tx.from.toLowerCase();
      const toAddress = tx.to ? tx.to.toLowerCase() : null;
      const value = parseFloat(tx.value) / 1e18; //convert wei to eth
      
      //skip if the 'to' address is null or if the transaction value is 0
      if (!toAddress || value <= 0) return;
      
      //add nodes if they don't exist
      if (!nodes.has(fromAddress)) {
        nodes.set(fromAddress, {
          id: fromAddress,
          val: 2, 
          isCenter: false
        });
      }
      
      if (!nodes.has(toAddress)) {
        nodes.set(toAddress, {
          id: toAddress,
          val: 2, 
          isCenter: false
        });
      }
      
      //create a unique link ID
      const linkId = `${fromAddress}-${toAddress}`;
      
      //update or create the link
      if (links.has(linkId)) {
        const existingLink = links.get(linkId);
        links.set(linkId, {
          ...existingLink,
          val: existingLink.val + value, //add to the existing value
          count: existingLink.count + 1
        });
      } else {
        links.set(linkId, {
          source: fromAddress,
          target: toAddress,
          val: value,
          count: 1
        });
      }
    });

    //convert maps to arrays for the response
    const graphData = {
      nodes: Array.from(nodes.values()),
      links: Array.from(links.values())
    };

    //store in Supabase for recent searches
    try {
      await supabase.from("recent_searches").insert([{ address }]);
    } catch (error) {
      console.error('Error storing search:', error);
      //continue even if supabase insert fails
    }

    return NextResponse.json(graphData, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }, { status: 500 });
  }
}