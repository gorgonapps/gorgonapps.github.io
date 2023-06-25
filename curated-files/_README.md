# Curated Project: Gorgon game files

Files in this directory are modified copies of original files available at [this link](https://cdn.projectgorgon.com/).
The original content of these files is Copyright 2023 Elder Game, LLC.

The modified files are made available to simplify JSON deserialization (original files require some customized filters to be deserialized properly.) They also contain fixes for several errors and typos.

## Common changes made in multiple files

+ When appropriate, root object keys are not prefixed, and only the key is preserved. For instance, `item_40112` becomes `40112`. With this change, files can be deserialized as dictionaries with `int` keys.
+ `{ }` and `[ ]` become `{}` and `[]` respectively.

## abilities.json

+ `SpecialCasterRequirements` is always an array, even if it contains only one object.
+ `SelfEffectsOnCrit` and `SelfEffectOnCrit` are unified as `SelfEffectsOnCrit`.
+ Removed `"Projectile": "0"` assuming it means "None" (this is found in bash-type abilities).
+ Converted `SelfParticle`, `SelfPreParticle` and `TargetParticle` to a new `AbilityParticle` object. Ex:
```
"SelfPreParticle": "ChannelHealPre(AoeRange=20;AoeColor=#00FF00)",
"TargetParticle": "PsiWave(Color=#FFC000,#FFC080)"
```
becomes
```
"SelfPreParticle": {
	"AoEColor": "00FF00",
	"AoERange": 20,
	"ParticleName": "ChannelHealPre"
},
"TargetParticle": {
	"ParticleName": "PsiWave",
	"PrimaryColor": "FFC000",
	"SecondaryColor": "FFC080"
}
```
+ The `TargetTypeTagReq` field becomes `TargetTypeTagRequirement` and its content starting with `AnatomyType_` now starts with `Anatomy_` (to match skill names). Ex:
```
"TargetTypeTagReq": "AnatomyType_Arthropods"
```
becomes
```
"TargetTypeTagRequirement": "Anatomy_Arthropods"
```
+ `InventoryKeywordReqErrorMessage`, `InventoryKeywordReqs`, `ItemKeywordReqErrorMessage`, `ItemKeywordReqs`, `PetTypeTagReq`, `PetTypeTagReqMax`, `SpecialTargetingTypeReq` and `TargetEffectKeywordReq` are renamed to `InventoryKeywordRequirementErrorMessage`, `ItemKeywordRequirementErrorMessage`, `InventoryKeywordRequirements`, `ItemKeywordRequirements`, `PetTypeTagRequirement`, `PetTypeTagRequirementMax`, `SpecialTargetingTypeRequirement` and `TargetEffectKeywordRequirement` respectively.
+ `InternalAbility` is renamed to `IsInternalAbility`.
+ `AoEIsCenteredOnCaster` is renamed to `IsAoECenteredOnCaster`.
+ `Rank` becomes an integer field.
+ A new field is added: `DigitStrippedName`. This field is the `InternalName` field, stripped of digits and with a whitespace before upper-case letters. The following names are also changed to better match category names:

| `InternalName`     | `DigitStrippedName` |
|--------------------|---------------------|
| `StabledPetLiving` | `Stabled Pet`       |
| `TameRat`          | `Tame Animal`       |
| `TameCat`          | `Tame Animal`       |
| `TameBear`         | `Tame Animal`       |
| `TameBee`          | `Tame Animal`       |
| `BasicShotB`       | `Basic Shot`        |
| `AimedShotB`       | `Aimed Shot`        |
| `BlitzShotB`       | `Blitz Shot`        |
| `ToxinBombB`       | `Mycotoxin Formula` |
| `ToxinBombC`       | `Acid Bomb`         |
| `FireWallB`        | `Fire Wall`         |
| `IceVeinsB`        | `Ice Veins`         |
| `SliceB`           | `Duelists Slash`    |
| `WerewolfPounceB`  | `Pouncing Rend`     |
| `WerewolfPounceBB` | `Pouncing Rend`     |
+ `SelfPreEffects` in `PvE` is converted to an array of new `SelfPreEffect` objects. Ex:
```
"SelfPreEffects": [
	"MambaStrikeLowArmorDmgMod"
],
"SelfPreEffects": [
	"EnhanceZombie(SuperZombie1)"
],
"SelfPreEffects": [
	"ConfigGalvanize(,50)"
]
```
becomes
```
"SelfPreEffects": [
	{
		"Name": "MambaStrikeLowArmorDmgMod"
	}
],
"SelfPreEffects": [
	{
		"Enhancement": "SuperZombie1",
		"Name": "EnhanceZombie"
	}
],
"SelfPreEffects": [
	{
		"Name": "ConfigGalvanize",
		"Value": 50
	}
]
```

## advancementtables.json

+ The creature name is a separate `Name` field.
+ The file is restructured to use levels as dictionary keys.
+ Each level is a collection of attributes names and values.

Before:
```
"1001_Skeleton": {
	"Level_01": {
		"VULN_CRUSHING": 0.25,
		"VULN_DARKNESS": -0.5,
		"VULN_FIRE": 0.25,
		"VULN_NATURE": 0.25,
		"VULN_POISON": -0.5,
		"VULN_TRAUMA": -0.5
	}
}
```

After:
```
"1001": {
	"Levels": {
		"1": {
			"Attributes": [
				{
					"Attribute": "VULN_CRUSHING",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_DARKNESS",
					"Value": -0.5
				},
				{
					"Attribute": "VULN_FIRE",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_NATURE",
					"Value": 0.25
				},
				{
					"Attribute": "VULN_POISON",
					"Value": -0.5
				},
				{
					"Attribute": "VULN_TRAUMA",
					"Value": -0.5
				}
			]
		}
	},
	"Name": "Skeleton"
}
```

## ai.json

+ Field names begin with an upper case letter. Ex: `cue` becomes `Cue`.

## areas.json

No change.

## attributes.json

+ A bunch of attributes have been added so they can be linked to by other objects. All have `DisplayRule` set to `Never` and `DisplayType` set to `AsBuffDelta`. Here is a (possibly not up-to-date) list:
    - `COCKATRICEDEBUFF_COST_DELTA`
    - `LAMIADEBUFF_COST_DELTA`
    - `MONSTER_MATCH_OWNER_SPEED`
    - `ARMOR_MITIGATION_RATIO`
    - `SHOW_CLEANLINESS_INDICATORS`
    - `SHOW_COMMUNITY_INDICATORS`
    - `SHOW_PEACEABLENESS_INDICATORS`
    - `SHOW_FAIRYENERGY_INDICATORS`
    - `BOOST_ANIMALPETHEAL_SENDER`
    - `MONSTER_COMBAT_XP_VALUE`
    - `MOD_VAULT_SIZE`
    - `MENTAL_DEFENSE_RATING`

## directedgoals.json

+ The collection of objects becomes a dictionary, indexed by the value of `ID`. Ex:
```
{
	"Id": 1,
	"IsCategoryGate": true,
	"Label": "General",
	"LargeHint": "",
	"SmallHint": "",
	"Zone": "Tasks without a specific location"
}
```
becomes
```
"1": {
	"IsCategoryGate": true,
	"Label": "General",
	"LargeHint": "",
	"SmallHint": "",
	"Zone": "Tasks without a specific location"
}
```

## effects.json

+ `Duration` is always an integer (and not sometime a string).
+ `Desc` becomes `Description`.
+ Converted `Particle` to a new `EffectParticle` object. Ex:
```
"Particle": "ShadowFeintOrigin(AoeRange=20;AoeColor=#FFFFFF)"
```
becomes
```
"Particle": {
	"AoEColor": "FFFFFF",
	"AoERange": 20,
	"ParticleName": "ShadowFeintOrigin"
}
```

## items.json

No change.

## itemuses.json

No change.

## lorebookinfo.json

+ Fields are sorted by alphabetical order. Ex: `SortTitle` comes before `Title`.

## lorebooks.json

No change.

## npcs.json

+ Fields are sorted by alphabetical order. Ex: `Name` comes before `Preferences`.
+ Same in NPC preferences: `Desire` comes before `Keywords`.
+ The file is formatted in the same pretty format as others.

## playertitles.json

No change.

## quests.json

No change.

## recipes.json

+ `OtherRequirements` is always an array, even if it contains only one object.
+ Converted `LoopParticle` and `Particle` to a new `RecipeParticle` object. Ex:
```
"Particle": "TeleportFlash(Color=#6D00FF,#BE8DFF;LightColor=#BE8DFF)"
```
becomes
```
"Particle": {
	"LightColor": "BE8DFF",
	"ParticleName": "TeleportFlash",
	"PrimaryColor": "6D00FF",
	"SecondaryColor": "BE8DFF"
}
```

## skills.json

+ `Rewards` is restructured and becomes a collection of objects, with the key converted to the `Level` and `Races` fields. Ex:
```
"10_Human_Elf_Rakshasa_Fae_Dwarf": {
	"Ability": "BlitzShot2"
}
```
becomes
```
{
	"Ability": "BlitzShot2",
	"Level": 10,
	"Races": [
		"Human",
		"Elf",
		"Rakshasa",
		"Fae",
		"Dwarf"
	]
}
```
+ `AdvancementHints` is restructured and becomes a collection of objects, with the key converted to the `Level` field. Ex:
```
"AdvancementHints": {
	"50": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
	"60": "To earn more XP in Armor Augmentation, gain favor with Kohan or Ufkar in Rahu."
}
```
becomes
```
"AdvancementHints": [
	{
		"Hint": "To earn more XP in Ancillary-Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
		"Level": 50
	},
	{
		"Hint": "To earn more XP in Ancillary-Armor Augmentation, gain favor with Kohan or Ufkar in Rahu.",
		"Level": 60
	}
],
```
+ `InteractionFlagLevelCaps` is restructured and becomes a collection of objects, with the key and value converted to fields. Performance skills are specified as such, with any `performance` prefix removed. Ex:
```
"LevelCap_AncillaryArmorAugmentBrewing_100": 90,
"LevelCap_Performance_Percussion20": 10
```
becomes
```
{
	"IsPerformanceSkill": false,
	"Level": 90,
	"Skill": "AncillaryArmorAugmentBrewing",
	"SkillCap": 100
},
{
	"IsPerformanceSkill": true,
	"Level": 10,
	"Skill": "Percussion",
	"SkillCap": 20
}
```
+ `Reports` is restructured and becomes a collection of objects, with the key converted to the `Level` and `Report` fields. Ex:
```
"Reports": {
	"1": "Get Binding Info",
	"2": "List Used Teleport Locations"
}
```
becomes
```
"Reports": [
	{
		"Level": 1,
		"Report": "Get Binding Info"
	},
	{
		"Level": 2,
		"Report": "List Used Teleport Locations"
	}
]
```

## sources_abilities.json and sources_recipes.json

+ Field names begin with an upper case letter. Ex: `entries` becomes `Entries`, `npc` becomes `Npc`.

## storagevaults.json

No change.

## tsysclientinfo.json

+ In `Tiers`, object keys are not prefixed, and only the key is preserved. For instance, `id_1` becomes `1`. With this change, tiers can be deserialized as dictionaries with `int` keys.

## xptables.json

No change.
