const promptPrefix = "anon@howardwallis.tech"

let prompt = text => {
    return text ? `${promptPrefix} ${text}$` : `${promptPrefix}$`;
}

export default {
    prompt,
}