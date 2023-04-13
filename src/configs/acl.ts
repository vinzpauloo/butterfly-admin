import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  /*
  ADMIN ROLES: (1 GOD, 2 SUPERVISOR, 3 CC, 4 SA, 5 AGENT)
  */

  const allActions = ['read', 'create', 'update', 'delete']
  can(allActions, 'shared-page')

  if (role === 'admin' || role === 'GOD' || role === 'SUPERVISOR') {
    can('manage', 'all')
  } else if (role === 'CC') {
    can(allActions, 'cc-page')
  } else if (role === 'SA') {
    can(allActions, 'sa-page')
  } else if (role === 'AGENT') {
    can(allActions, 'agent-page')
  } else {
    can(allActions, subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
