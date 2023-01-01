import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL} from "../constants/productsConstants"

export const productListReducer =( state={prodata:[]},action)=>{
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,prodata:[]}
        case PRODUCT_LIST_SUCCESS:
            return {loading : false, prodata: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}