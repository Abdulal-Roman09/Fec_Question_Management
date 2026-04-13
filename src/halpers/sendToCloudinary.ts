import fs from 'fs'
import cloudinary from './cloudinary'



export const sendToCloudinary = async (file: any, options: any = {}) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, options,
            (error: Error, result: any) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
    })
}