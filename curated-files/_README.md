# Project: Gorgon curated game files

Files in this directory are modified copies of original files available at [this link](https://cdn.projectgorgon.com/).
The original content of these files is Copyright 2023 Elder Game, LLC.

The modified files are made available to simplify JSON deserialization (original files require some customized filters to be deserialized properly.) They also contain fixes for several errors and typos.

## Common changes made in multiple files

+ When appropriate, root object keys are not prefixed, and only the key is preserved. For instance, `item_40112` becomes `40112`. With this change, files can be deserialized as dictionaries with `int` keys.
+ `{ }` and `[ ]` become `{}` and `[]` respectively.
+ Colors are normalized to the `RRGGBB` hex format (upper case). Ex: `red` becomes `FF0000`. When present, the alpha part is removed because it's always `FF`.

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
+ The file is restructured so that `Levels` are collections of object with a `Level` field.
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
	"Levels": [
		{
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
			],
			"Level": 1
		}
	],
	"Name": "Skeleton"
}
```

## ai.json

+ Field names begin with an upper case letter. Ex: `cue` becomes `Cue`.
+ `MinDistance` and `MinRange` are consolidated to just be `MinRange` (they don't seem to be set separately).

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

+ `FoodDesc`, `IsSkillReqsDefaults`, `NumUses` and `SkillReqs` are renamed to `FoodDescription`, `IsSkillRequirementsDefaults`, `NumberOfUses` and `SkillRequirements` respectively.
+ `DroppedAppearance` is converted to an object with fields like `Skin`, `Cork`, etc. The `^` prefix is removed, both in field names and values. Ex:
```
"DroppedAppearance": "LootPotion1(Color=red)",
"DroppedAppearance": "AlchemyBulb5(^Skin=AlchemyBulbs;^Cork=AlchemyBulbs)",
"DroppedAppearance": "CookedBrownBreadPlate(^Food=GF-Food;^Plate=GF-Dishes)",
"DroppedAppearance": "Peach(Skin=^Medieval-Fruits;Skin_Color=FF8E00)"
```
become
```
"DroppedAppearance": {
	"Appearance": "LootPotion1",
	"Color": "FF0000"
},
"DroppedAppearance": {
	"Appearance": "AlchemyBulb5",
	"Cork": "AlchemyBulbs",
	"Skin": "AlchemyBulbs"
},
"DroppedAppearance": {
	"Appearance": "CookedBrownBreadPlate",
	"Food": "GF-Food",
	"Plate": "GF-Dishes"
},
"DroppedAppearance": {
	"Appearance": "Peach",
	"Skin": "Medieval-Fruits",
	"SkinColor": "FF8E00"
}
```
+ `EffectDescs` is renamed to `EffectDescriptions` and is converted to an object. For a simple description only the `Description` field is filled, otherwise the `AttributeName` and `AttributeEffect` are filled with the attribute name and value effect respectively. Ex:
```
"EffectDescs": [
	"Death by iocaine poison"
],
"EffectDescs": [
	"{MAX_ARMOR}{6}",
	"{COMBAT_REFRESH_HEALTH_DELTA}{3}",
	"{COMBAT_REFRESH_ARMOR_DELTA}{3}",
	"{COMBAT_REFRESH_POWER_DELTA}{1}"
]
```
become
```
"EffectDescriptions": [
	{
		"Description": "Death by iocaine poison"
	}
],
"EffectDescriptions": [
	{
		"AttributeEffect": 6,
		"AttributeName": "MAX_ARMOR"
	},
	{
		"AttributeEffect": 3,
		"AttributeName": "COMBAT_REFRESH_HEALTH_DELTA"
	},
	{
		"AttributeEffect": 3,
		"AttributeName": "COMBAT_REFRESH_ARMOR_DELTA"
	},
	{
		"AttributeEffect": 1,
		"AttributeName": "COMBAT_REFRESH_POWER_DELTA"
	}
]
```
+ `Keywords` is converted to an array of objects. The `Keyword` field contains the keyword name, and `Values` the various values that can be listed for this keyword. Note that the order in which keywords and values are listed may not be preserved. For example:
```
"Keywords": [
	"Drink=40",
	"Edible",
	"EggDish=30",
	"Food",
	"PreparedFood=25",
	"PreparedFood=30",
	"Snack",
	"Snack=40"
]
```
becomes
```
"Keywords": [
	{
		"Keyword": "Drink",
		"Values": [
			40
		]
	},
	{
		"Keyword": "Edible"
	},
	{
		"Keyword": "EggDish",
		"Values": [
			30
		]
	},
	{
		"Keyword": "Food"
	},
	{
		"Keyword": "PreparedFood",
		"Values": [
			25,
			30
		]
	},
	{
		"Keyword": "Snack",
		"Values": [
			40
		]
	}
]
```
+ `StockDye` is converted to an object (and is removed if empty). Ex:
```
"StockDye": "",
"StockDye": ";Color1=007777;Color2=0077cc;Color3=cyan",
"StockDye": ";Color1=FFD872FF;Color2=383223FF;Color3=B0B57DFF",
"StockDye": ";Color1=333333;Color2=0056ff;Color3=FFFFFF;GlowEnabled=y"
```
becomes
```
"StockDye": {
	"Color1": "007777",
	"Color2": "0077CC",
	"Color3": "00FFFF",
	"IsGlowEnabled": false
},
"StockDye": {
	"Color1": "FFD872",
	"Color2": "383223",
	"Color3": "B0B57D",
	"IsGlowEnabled": false
},
"StockDye": {
	"Color1": "333333",
	"Color2": "0056FF",
	"Color3": "FFFFFF",
	"IsGlowEnabled": true
}
```

## itemuses.json

No change.

## lorebookinfo.json

+ Fields are sorted by alphabetical order. Ex: `SortTitle` comes before `Title`.

## lorebooks.json

No change.

## npcs.json

+ Fields are sorted by alphabetical order. Ex: `Name` comes before `Preferences`.
+ Fields are also sorted in NPC preferences: `Desire` comes before `Keywords`.
+ The file is formatted in the same pretty format as others.
+ In `AreaName` the `Area` prefix is removed (to match with area names).
+ In NPC preferences, the `Keywords` field is converted to new fields. Ex:
```
"Keywords":["MinValue:1000"],
"Keywords":["EquipmentSlot:Head","SkillPrereq:Hammer","Loot"],
"Keywords":["Knife","Loot","MinRarity:Uncommon"],
"Keywords":["Rarity:Common","Equipment"]
```
becomes
```
{
	"MinValueRequirement": 1000,
},
{
	"ItemKeywords": [
		"Loot"
	],
	"SlotRequirement": "Head",
	"SkillRequirement": "Hammer"
},
{
	"ItemKeywords": [
		"Knife",
		"Loot"
	],
	"MinRarityRequirement": "Uncommon"
},
{
	"ItemKeywords": [
		"Equipment"
	],
	"RarityRequirement": "Common"
},
```
+ In NPC preferences, `"Favor": "Error"` is just removed.
+ In NPC preferences, `Pref` is renamed to `PreferenceMultiplier`.
+ NPC preferences are sorted by desire, from love to hate.

## playertitles.json

+ If a title is colored, the color is saved in the `Color` field. Ex:
```
"Title_1": {
	"Title": "<color=cyan>Game Admin</color>"
},
```
becomes
```
"1": {
	"Color": "00FFFF",
	"Title": "Game Admin"
},
```

## quests.json

+ The `Reward_Favor` and `Rewards_Favor` fields are converted to a favor reward. Ex:
```
"Reward_Favor": 50,
"Rewards_Favor": 100
```
becomes
```
"Rewards": [
	{
		"Favor": 50,
		"T": "Favor"
	}
],
"Rewards": [
	{
		"Favor": 100,
		"T": "Favor"
	}
]
```
+ The `Rewards_NamedLootProfile` field is converted to a reward as well. Ex:
```
"Rewards_NamedLootProfile": "Custom_HelpTheHiveQuest"
```
becomes
```
"Rewards": [
	{
		"NamedLootProfile": "Custom_HelpTheHiveQuest",
		"T": "NamedLootProfile"
	}
]
```
+ The `Rewards_Effects` field is also converted, in a more complicated way. Each effect is converted to a reward, as follow.
  - `SetInteractionFlag` becomes the `"T": "InteractionFlag"` reward with an `InteractionFlag` field.
  - `EnsureLoreBookKnown` becomes the `"T": "LoreBook"` reward with a `LoreBook` field.
  - `BestowTitle` becomes the `"T": "Title"` reward with a `Title` field and each title identifier is converted to their id (the JSON files don't contain the identifier, making the association difficult).
  - `BestowRecipe` becomes the `"T": "Recipe"` reward with a `Recipe` field.
  - `LearnAbility` becomes the `"T": "Ability"` reward with an `Ability` field.
  - `AdvanceScriptedQuestObjective` becomes the `"T": "ScriptedQuestObjective"` reward with a `Npc` field, and the `_Complete` or `_Done` suffix is removed (to match NPC names).
  - `GiveXP` becomes the `"T": "SkillXp"` reward with the `Skill` and `Xp` fields.
  - `DeltaNpcFavor` becomes the `"T": "Favor"` reward with the `Npc` and `Favor` fields.
  - `RaiseSkillToLevel` becomes the `"T": "SkillLevel"` reward with the `Skill` and `Level` fields.
  - `DispelFaeBombSporeBuff` becomes the `"T": "DispelFaeBombSporeBuff"` reward.
  - Finally, other effects converted to the `"T": "Effect"` reward with an `Effect` field.
+ Similarily, the `PreGiveEffects` field is converted to an array of effects, as follow.
  - `DeleteWarCacheMapFog` becomes the `"T": "Effect"` effect with a `Description` field.
  - `DeleteWarCacheMapPins` becomes the `"T": "Effect"` effect with a `Description` field.
  - `CreateIlmariWarCacheMap` becomes the `"T": "Item"` effect with the `Item` and `QuestGroup` fields.
  - `SetInteractionFlag` becomes the `"T": "SetInteractionFlag"` effect with an `InteractionFlag` field.
  - `ClearInteractionFlag` becomes the `"T": "ClearInteractionFlag"` effect with an `InteractionFlag` field.
  - `LearnAbility` becomes the `"T": "Ability"` effect with an `Ability` field.

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
