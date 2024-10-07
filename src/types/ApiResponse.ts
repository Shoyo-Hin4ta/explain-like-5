
export interface ApiResponse<T = undefined>{
    success : boolean;
    message : string;
    data? : T;
    error? : {
        code : string;
        details : string;
    };
}