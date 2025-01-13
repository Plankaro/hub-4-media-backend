import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
  createMongoAbility,
} from '@casl/ability';

import { Injectable } from '@nestjs/common';
import { BlogCategory, BlogPost } from 'src/blog/entities';
import { UserRole } from 'src/users/types/user-role';
import { User } from 'src/users/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  ReadOwn = 'readOwn',
  UpdateOwn = 'updateOwn',
  Update = 'update',
  Delete = 'delete',
  Publish = 'publish',
}

export type Subjects =
  | InferSubjects<typeof User | typeof BlogPost | typeof BlogCategory>
  | 'all';

type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class AbilityFactory {
  defineAbilityForUser(user: User) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    switch (user.role) {
      case UserRole.SUPER_ADMIN:
        can(Action.Manage, 'all');
      // eslint-disable-next-line no-fallthrough
      case UserRole.ADMIN:
        can(Action.Create, BlogPost);
        can(Action.Create, BlogCategory);

      case UserRole.PROVIDER:
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
