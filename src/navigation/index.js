
import { allNavs } from "./allNav"

export const getNavs = (role) => {
    const finalNavs = []
    // for (let i = 0; i < allNavs.length; i++) {
    //     if (role === allNavs[i].role) {
    //         finalNavs.push(allNavs[i])
    //     }
    // }
    allNavs.forEach((navRole, i, _) => {
        if (navRole.role === role) {
            finalNavs.push(navRole)
        }
    })
    return finalNavs;
}