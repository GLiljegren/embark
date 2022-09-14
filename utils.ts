const isNum = (val: string) => /^\d+$/.test(val)

export const parseNumber = (id: any) => {
    return id ?
        (typeof id === 'string') ? 
            isNum(id) ? 
                parseInt(id) : 0
            : isNum(id?.join()) ?
                parseInt(id?.join()) : 0
        : 0
}