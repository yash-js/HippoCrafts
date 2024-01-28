import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdmidOrHasAccessToImages = (): Access => async ({
    req
}) => {
    const user = req.user as User | null
    if (!user) return false

    if (user.role === 'admin') return true

    return {
        user: {
            equals: req?.user?.id
        }
    }

}


export const Media: CollectionConfig = {
    slug: "media",
    admin: {
        hidden: ({ user }) => user?.role !== 'admin'
    },
    hooks: {
        beforeChange: [
            ({ req, data }) => {
                return { ...data, user: req.user.id }
            }
        ]
    },
    access: {
        read: async ({ req }) => {
            const referer = req.headers.referer
            if (!req.user || !referer?.includes('sell')) {
                return true
            }

            return await isAdmidOrHasAccessToImages()({ req })
        },
        delete: isAdmidOrHasAccessToImages(),
        update: isAdmidOrHasAccessToImages()
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre'
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre'
            },

            {
                name: 'tablet',
                width: 1024,
                position: 'centre',
                height: undefined
            }

        ],
        mimeTypes: ['image/*']
    },
    fields: [
        {
            name: "user",
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        }
    ]
}