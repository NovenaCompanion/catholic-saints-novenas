-- Adding prayers for days 2-54 of the 54 Day Rosary Novena
-- First 27 days are in petition (days 1-27)
-- Last 27 days are in thanksgiving (days 28-54)

-- Days 2-27 (Petition)
INSERT INTO novena_prayers (saint_id, day, title, content) 
VALUES 
(9, 2, 'Day 2 Prayer - Sorrowful Mysteries', 'Today we pray the Sorrowful Mysteries in petition.\n\nThe Agony in the Garden\nThe Scourging at the Pillar\nThe Crowning with Thorns\nThe Carrying of the Cross\nThe Crucifixion\n\nRemember to recite the full Rosary while meditating on these mysteries.');

INSERT INTO novena_prayers (saint_id, day, title, content) 
VALUES 
(9, 3, 'Day 3 Prayer - Glorious Mysteries', 'Today we pray the Glorious Mysteries in petition.\n\nThe Resurrection\nThe Ascension\nThe Descent of the Holy Spirit\nThe Assumption of Mary\nThe Coronation of Mary\n\nRemember to recite the full Rosary while meditating on these mysteries.');

-- Days 4-27: Continue the rotation of mysteries (Joyful, Sorrowful, Glorious)
-- Days 28-54: Same rotation but in thanksgiving
