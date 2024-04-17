

export interface RecommendedFeeType {
    fastestFee: number,
    hourFee: number,
    halfHourFee: number,
    economyFee: number,
    minimumFee: number
}

export interface TransactionDataType {
    txid: string,
    weight: number,
    fee: number,
    status: {
        confirmed: boolean,
    }
}

export interface TransactionAccelaratorFeeEstimationType {
    txSummary: {
        txid: string,
        effectiveVsize: number,
        effectiveFee: number,
        ancestorCount: number,
    },
    cost: number,
    targetFeeRate: number,
    nextBlockFee: number,
    userBalance: number,
    mempoolBaseFee: number,
    vsizeFee: number,
    hasAccess: boolean,
}

export interface TransactionFeeBumpStatusType {
    /** The transaction Id received from the request */
    txId: string,
    /** The transaction status */
    txConfirmed: boolean,
    /** If the transaction should be bumped */
    shouldBump: boolean,
    /** The previous satoshi per virtual byte */
    prevSatVbyte: number,
    /** The previous fee */
    prevFee: number,
    /** The new ideal satoshi per virtual byte to bump the transaction */
    idealSatVbyteFee: number,
    /** The new ideal fee to bump the transaction */
    idealFee: number,
    /** The turbo satoshi per virtual byte to bump the transaction */
    turboSatVbyte: number,
    /** The turbo fee to bump the transaction (10% additional fee) */
    turboFee: number,
}

