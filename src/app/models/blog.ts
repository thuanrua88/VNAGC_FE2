export class blog {
    "id": number;
    "name": string;
    "banner_img": string;
    "cover_img": string;
    "cooking_time": string;
    "summary": string;
    "description": string;
    "url_video_utube": string;
    "url_video_youtube": string;
    "view": number;
    "status": number;
    "user_id": string;
    "category_id": number;
    "create_at": string;
    "update_at": string;
    "steps":string;
    hash_tags:[];
    "comments": [{
        "id": number,
        "description": string,
        "createdDate": string,
        "user_name": string,
        "user_avatar": string,
        "parent_id": number,
        "comment_replies": []
    }];
    "author": {
        "id": string,
        "fullName": string,
        "phoneNumber": string,
        "email": string,
        "avatar": string,
        "isAdmin": boolean,
        "type": number,
        "status": boolean,
        "countBlog": number
    }
    "metarial": [{
        "id": number;
        "title": string;
        "mass": number;
        "unit": string;
        "order": number;
        "blog_id": number;
    }];

    "content": [{
        "id": number;
        "name": string;
        "content": string;
        "banner_img": string;
        "banner_cover": string;
        "blog_id": number;
    }];

    "step": [{
        "id": number;
        "name": string;
        "banner_img": string;
        "description": string;
        "order": number;
        "blog_id": number;
    }];
}