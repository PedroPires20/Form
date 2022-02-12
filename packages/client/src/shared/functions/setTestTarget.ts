
export function setTestTarget(targetValue: string) {
    return (process.env.NODE_ENV == "production")? {}: {
        "data-test-target": targetValue
    }
}
