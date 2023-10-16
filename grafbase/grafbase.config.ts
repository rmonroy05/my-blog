import { g, auth, config } from '@grafbase/sdk'

const post = g.model('Post', {
  title: g.string(),
  slug: g.string().unique(),
  content: g.string().optional(),
  publishedAt: g.datetime().optional(),
  comments: g.relation(() => comment).optional().list().optional(),
  likes: g.int().default(0),
  tags: g.string().optional().list().length({ max: 5 }),
  author: g.relation(() => User).optional()
}).search()

const comment = g.model('Comment', {
  post: g.relation(post),
  body: g.string(),
  likes: g.int().default(0),
  author: g.relation(() => User).optional()
})

const User = g.model('User', {
  name: g.string(),
  email: g.email().optional(),
  posts: g.relation(post).optional().list(),
  comments: g.relation(comment).optional().list(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
}).auth((rules) => {
  rules.public().read()
})


// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().search(),
  createdBy: g.relation(() => User),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
})


export default config({
  schema: g
})
