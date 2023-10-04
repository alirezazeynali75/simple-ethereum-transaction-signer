require('dotenv').config();

function getConfig(name: string, defaultValue : any=null) {
    const configValue = process.env[name];
    if (configValue) {
        return configValue;
    } if (!defaultValue) {
        throw new Error(`error on getting env variable ${name}`);
    }
    return defaultValue;
}
export default getConfig;