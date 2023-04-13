export const formatNumber = (number: number) => {
    return(
        Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
        }).format(number)
    )
}

