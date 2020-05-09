
const indexer = (list, def) => {
    const res = []
    let i = 0
    if (def) {
        res.push(def)
        i++
    }
    for (i; i < list.length; i++) {
        res.push({name: list[i], id: i})
    }
    return res
}

const resultFilter = (data, indicator, countries, years) => {
    if (Object.keys(data).length > 0 & indicator.length > 0 & countries.length > 0) {
        if (years.length === 0 || years[0].id === 0) {
            const ret = []
            countries.map(country => {
                const point = {}
                point[country.name] = data[indicator[0].name][country.name]
                ret.push({
                    "name": country.name,
                    "data": data[indicator[0].name][country.name]
                })
            })
            return ret
        } else if (years[0].id > 0) {
            const ret = []
            countries.map(country => {
                const point = [country.name, data[indicator[0].name][country.name][years[0].name]]
                ret.push(point)
            })
            return ret
        }
    }
    return []
}   
const validateSelectedCountries = (newCountries, oldSelected) => {
    for (let i in Object.values(oldSelected)) {
        if (!oldSelected[i].name in newCountries) {
            return false
        }
    }
    return true
}
export {indexer, resultFilter, validateSelectedCountries}
