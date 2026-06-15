# API Endpoints

Base URL: `https://api.offerperks.com/v1`

---

## Offers

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/offers` | All offers (paginated: `?page=1&limit=20`) | 5 min |
| `GET` | `/offers/:id` | Single offer by ID | 5 min |
| `GET` | `/offers/trending` | Featured/trending offers (`?count=6`) | 5 min |
| `GET` | `/offers/popular` | Sorted by popularity desc (`?count=12`) | 10 min |
| `GET` | `/offers/recent` | Recently added (`?count=12`) | 10 min |
| `GET` | `/offers/expiring` | Active offers with closest expiration | 1 min |
| `GET` | `/offers/search` | Full-text search: `?q=github&category=dev&audience=students&tag=free` | 1 min |
| `GET` | `/offers/:id/similar` | Same-category + same-tag offers (`?count=4`) | 5 min |
| `POST` | `/offers` | Create offer (admin) | — |
| `PUT` | `/offers/:id` | Update offer (admin) | — |
| `DELETE` | `/offers/:id` | Delete offer (admin) | — |

## Categories

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/categories` | All categories with updated offer counts | 10 min |
| `GET` | `/categories/:slug` | Single category with offers (`?page=1`) | 5 min |

## Tags

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/tags` | All unique tags with offer counts | 10 min |
| `GET` | `/tags/:tag` | Offers by tag (`?page=1`) | 5 min |

## Blog

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/blog` | All posts (`?page=1&limit=10`) | 10 min |
| `GET` | `/blog/:slug` | Single post | 10 min |
| `GET` | `/blog/:slug/related` | Related posts (same tags) | 10 min |

## Guides

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/guides` | All guides | 10 min |
| `GET` | `/guides/:slug` | Single guide | 10 min |

## Regions & Student Types

| Method | Endpoint | Description | Cache |
|--------|----------|-------------|-------|
| `GET` | `/regions` | All regions | 1 day |
| `GET` | `/regions/:id` | Offers in region (`?page=1`) | 5 min |
| `GET` | `/student-types` | All student types | 1 day |
| `GET` | `/student-types/:id` | Offers for type (`?page=1`) | 5 min |

## Auth (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Email/password → JWT |
| `POST` | `/auth/register` | Admin account creation |
| `POST` | `/auth/refresh` | Refresh token |
| `GET` | `/auth/me` | Current admin profile |

## User Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/user/register` | Create user account |
| `POST` | `/auth/user/login` | User login → JWT |
| `GET` | `/user/favorites` | Get user's favorites |
| `POST` | `/user/favorites` | Add favorite (`{ offerId }`) |
| `DELETE` | `/user/favorites/:offerId` | Remove favorite |
| `GET` | `/user/claimed` | Get user's claimed offers |
| `POST` | `/user/claimed` | Mark as claimed (`{ offerId }`) |
| `DELETE` | `/user/claimed/:offerId` | Unmark claimed |

## Wishlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/wishlist` | All suggestions (sorted by votes) |
| `POST` | `/wishlist` | Submit suggestion (`{ title, description }`) |
| `POST` | `/wishlist/:id/vote` | Upvote |
| `DELETE` | `/wishlist/:id` | Remove (admin or owner) |

## Newsletter

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/newsletter/subscribe` | Subscribe email |
| `DELETE` | `/newsletter/unsubscribe` | Unsubscribe |

## Contact & Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contact` | Contact form submission |
| `POST` | `/offers/:id/report` | Report expired/incorrect offer |

## Public (No Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stats` | Site stats (offers count, categories, students served) |
| `GET` | `/changelog` | Site changelog/updates |
| `GET` | `/testimonials` | Student testimonials |

---

## Redis Cache Strategy

```
Key                                TTL
──────────────────────────────────────────
offers:list:page:{n}:limit:{m}      300s
offers:id:{id}                      300s
offers:trending:{count}             300s
offers:popular:{count}              600s
offers:recent:{count}               600s
offers:expiring:{count}              60s
offers:search:{query_hash}           60s
offers:similar:{id}:{count}         300s
categories:list                     600s
categories:slug:{slug}              300s
tags:list                           600s
tags:tag:{tag}:page:{n}             300s
blog:list:page:{n}                  600s
blog:slug:{slug}                    600s
blog:related:{slug}                 600s
guides:list                         600s
guides:slug:{slug}                  600s
regions:list                       86400s
student-types:list                 86400s
stats                               300s
changelog                          3600s
testimonials                       3600s
```

---

## Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 34,
    "totalPages": 2
  },
  "cachedAt": "2026-06-15T18:00:00Z"
}
```

## Error Format

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Offer not found"
  }
}
```
