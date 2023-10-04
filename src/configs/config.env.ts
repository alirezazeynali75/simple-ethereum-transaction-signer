require('dotenv').config();

function getConfig(name: string, defaultValue : any=null) {
    const uppercase = name.toUpperCase();
    const configValue = process.env[uppercase];
    if (configValue) {
        return configValue;
    } if (!defaultValue) {
        throw new Error(`error on getting env variable ${uppercase}`);
    }
    return defaultValue;
}
export default getConfig;